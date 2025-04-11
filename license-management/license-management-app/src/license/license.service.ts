/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DatabaseService } from 'database/database.service';
import { ExTraceabilityManagementService } from 'external/traceability-management.service';
import { CreateAssociateEndUserDto, UpdateUserDto } from 'user/dtos';
import { AssociateEndUser, EndUser } from 'user/entities';
import { UserService } from 'user/user.service';
import { AccessToken, AssociateEndUsers, AvailableDbsDto, ContractionInfoDto, CreateEndUserDto, EndUsers, Payload, Result, UpdateEndUserDto } from './dtos';
import * as LicenseException from './exceptions';
import { LicenseUtil } from './license.util';

/**
 * ライセンスサービス
 */
@Injectable()
export class LicenseService {
    constructor(
        private readonly userService: UserService,
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly exTraceabilityManagementService: ExTraceabilityManagementService,
    ) { }

    /**
     * 使用者生成
     * @param dto 使用者生成DTO
     * @returns 論理型
     */
    async createEndUser(dto: CreateEndUserDto): Promise<Result> {
        const databaseUseInfo = await this.databaseService.createDatabaseUseInfo(dto.databaseUseInfo);
        const endUser = await this.userService.createEndUser(dto, databaseUseInfo);
        return { result: endUser !== null };
    }

    /**
     * 使用者情報更新
     * @param id 使用者識別子
     * @param dto 使用者更新DTO
     * @returns 論理型
     */
    async updateEndUserInfo(id: string, dto: UpdateEndUserDto): Promise<Result> {
        const endUser = await this.userService.updateEndUser(id, dto);
        if (endUser == false) throw new LicenseException.EndUserNotExistsException();
        if (dto?.databaseUseInfo.dbUsageId !== endUser.databaseUseInfo.dbUsageId) throw new LicenseException.WrongDbUsageIdException();
        await this.databaseService.updateDatabaseUseInfo(dto.databaseUseInfo, endUser.databaseUseInfo);
        return { result: endUser !== null };
    }

    /**
     * 使用者情報取得
     * @param operatorId 事業者識別子
     * @returns 使用者情報のリスト
     */
    async getEndUserInfo(operatorId: string): Promise<EndUsers> {
        const endUsers = await this.userService.findEndUsersByOperatorId(operatorId);
        if (endUsers.length == 0) throw new LicenseException.OperatorNotExistsException();
        return { endUsers: new LicenseUtil().endUserMapper(endUsers) };
    }

    /**
     * 準使用者情報の更新
     * @param id 準使用者識別子
     * @param dto ユーザー更新DTO
     * @returns 論理型
     */
    async updateAssociateEndUserInfo(id: string, dto: UpdateUserDto): Promise<Result> {
        const subUser = await this.userService.updateAssociateEndUser(id, dto);
        if (subUser == false) throw new LicenseException.AssociateEndUserNotExistsException();
        return { result: subUser !== null };
    }

    /**
     * 準使用者情報取得
     * @param operatorId 事業者識別子
     * @returns 準使用者情報のリスト
     */
    async getAssociateEndUserInfo(operatorId: string): Promise<AssociateEndUsers> {
        const associateEndUsers = await this.userService.findAssociateEndUsersByOperatorId(operatorId);
        if (associateEndUsers.length == 0) throw new LicenseException.AssociateEndUserNotExistsException();
        return { associateEndUsers: new LicenseUtil().associateEndUserMapper(associateEndUsers) };
    }

    /**
     * 使用者の事業者識別子からアクセストークンを生成
     * @param operatorId 事業者識別子
     * @returns アクセストークン
     */
    async getAccessTokenByEndUserOperatorId(operatorId: string): Promise<AccessToken> {
        const endUsers = await this.userService.findEndUsersByOperatorId(operatorId);
        const atLeastOneAgreed = endUsers.some(endUser => endUser.agreeStatus);
        if (!atLeastOneAgreed) throw new LicenseException.EndUserLicenseAuthFailedException();
        return this.getAccessToken(endUsers[0]);
    }

    /**
     * 準使用者の事業者識別子と契約情報DTOから準使用者の情報を削除または生成しアクセストークンを生成
     * @param operatorId 事業者識別子
     * @param dto 契約情報DTO
     * @returns アクセストークン
     */
    async getAccessTokenByAssociateEndUserOperatorId(operatorId: string, dto: ContractionInfoDto): Promise<AccessToken> {
        const endUsers = await this.getEndUsersFromAssociateEndUserOperatorIdAndTradeId(operatorId, dto.tradeId);
        const canUseDBs = endUsers.map(endUser => { return endUser.databaseUseInfo });
        const associateEndUsers = await this.userService.findAssociateEndUsersByOperatorId(operatorId);

        const usedDbUsageIds: string[] = [];
        const remainAssociateEndUsers: AssociateEndUser[] = [];
        for (const associateEndUser of associateEndUsers) {
            if (canUseDBs.find((canUseDB) => canUseDB.dbUsageId === associateEndUser.databaseUseInfo.dbUsageId)) {
                remainAssociateEndUsers.push(associateEndUser);
                usedDbUsageIds.push(associateEndUser.databaseUseInfo.dbUsageId);
            } else {
                await this.userService.deleteAssociateEndUserById(associateEndUser.id);
            }
        }

        const createSubUserDto: CreateAssociateEndUserDto = { operatorId, tradeId: dto.tradeId, agreeStatus: false };

        for (const canUseDB of canUseDBs) {
            if (usedDbUsageIds.find((dbUsageId) => dbUsageId === canUseDB.dbUsageId)) continue;
            remainAssociateEndUsers.push(await this.userService.createAssociateEndUser(createSubUserDto, canUseDB));
        }

        const atLeastOneAgreed = remainAssociateEndUsers.some(aeu => aeu.agreeStatus);
        if (!atLeastOneAgreed) throw new LicenseException.AssociateEndUserNotAgreedException(new LicenseUtil().associateEndUserFlatMapper(remainAssociateEndUsers));

        return this.getAccessToken(remainAssociateEndUsers[0]);
    }

    /**
     * 準使用者の事業者識別子と取引関係情報識別子から使用者のリストを取得
     * @param operatorId 事業者識別子
     * @param tradeId 取引関係情報識別子
     * @returns 使用者のリスト
     */
    async getEndUsersFromAssociateEndUserOperatorIdAndTradeId(operatorId: string, tradeId: string): Promise<EndUser[]> {
        const endUserOperatorIds: string[] = await this.exTraceabilityManagementService.getBottomTradeOperators(operatorId, tradeId);
        const endUsers: EndUser[] = [];
        for (const endUserOperatorId of endUserOperatorIds) {
            endUsers.push(...(await this.userService.findEndUsersByOperatorId(endUserOperatorId)));
        }
        if (endUsers.length == 0) throw new LicenseException.AssociateEndUserLicenseAuthFailedException();
        return endUsers;
    }

    /**
     * 利用可能なデータベースDTOに取得
     * @param payload アクセストークンの中身
     * @returns 利用可能なデータベースDTOのリスト
     */
    async getAvailableDatabases(payload: Payload): Promise<AvailableDbsDto> {
        const operatorId = payload.sub;
        const isEndUser = payload.isEndUser;

        const users = isEndUser
            ? await this.userService.findEndUsersByOperatorId(operatorId)
            : await this.userService.findAssociateEndUsersByOperatorId(operatorId);

        const now = new Date();

        const validatedUsers = users.filter(user => {
            return user.agreeStatus &&
                user.databaseUseInfo.usageStatus == 'valid' &&
                new Date(user.databaseUseInfo.expiredDate).getTime() >= now.getTime();
        });

        return {
            availableDbs: validatedUsers.map(user => {
                return {
                    databaseName: user.databaseUseInfo.database.name,
                    version: user.databaseUseInfo.database.version
                }
            })
        };
    }

    /**
     * アクセストークンの取得
     * @param user 使用者または準使用者
     * @returns アクセストークン
     */
    async getAccessToken(user: EndUser | AssociateEndUser): Promise<AccessToken> {
        const payload: Payload = { sub: user.operatorId, isEndUser: user instanceof EndUser }
        const accessToken = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1d' })
        return { accessToken };
    }
}
