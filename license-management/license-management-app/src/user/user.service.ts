/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { InventoryDatabaseUseInfo } from 'database/entities';
import { CreateAssociateEndUserDto, UpdateUserDto } from './dtos';
import { CreateUserDto } from './dtos/create-user.dto';
import { AssociateEndUser, EndUser } from './entities';

/**
 * ユーザーサービス
 */
@Injectable()
export class UserService {
	constructor(
		@InjectRepository(EndUser) private readonly endUserRepository: Repository<EndUser>,
		@InjectRepository(AssociateEndUser) private readonly associateEndUserRepository: Repository<AssociateEndUser>,
	) { }

	/**
	 * 使用者情報登録
	 * @param dto ユーザー生成DTO
	 * @param databaseUseInfo DB情報
	 * @return Promise型の使用者
	 */
	async createEndUser(dto: CreateUserDto, databaseUseInfo: InventoryDatabaseUseInfo): Promise<EndUser> {
		const endUser = new EndUser();
		endUser.operatorId = dto.operatorId;
		endUser.agreeStatus = dto.agreeStatus;
		endUser.databaseUseInfo = databaseUseInfo;
		return this.endUserRepository.save(endUser);
	}

	/**
	 * 使用者情報更新
	 * @param id 使用者情報識別子
	 * @param dto ユーザー更新DTO
	 * @return 更新成功時Promise型の使用者、更新失敗時false
	 */
	async updateEndUser(id: string, dto: UpdateUserDto): Promise<EndUser | false> {
		var endUser = await this.findEndUserById(id);
		if (endUser == null) return false;
		endUser.agreeStatus = dto.agreeStatus;
		return this.endUserRepository.save(endUser);
	}

	/**
	 * 事業者識別子で使用者のリストを探す
	 * @param operatorId 事業者識別子
	 * @return Promise型のDB情報を含む使用者の配列
	 */
	findEndUsersByOperatorId(operatorId: string): Promise<EndUser[]> {
		return this.endUserRepository.find({
			relations: ['databaseUseInfo', 'databaseUseInfo.database'],
			where: { operatorId }
		});
	}

	/**
	 * 使用者情報識別子で特定の使用者を探す
	 * @param id 使用者情報識別子
	 * @return Promise型のDB情報を含む使用者
	 */
	findEndUserById(id: string): Promise<EndUser> {
		return this.endUserRepository.findOne({
			relations: ['databaseUseInfo', 'databaseUseInfo.database'],
			where: { id }
		})
	}

	/**
	 * 準使用者情報登録
	 * @param dto 準使用者生成DTO
	 * @param databaseUseInfo DB情報
	 * @return Promise型の準使用者
	 */
	createAssociateEndUser(dto: CreateAssociateEndUserDto, databaseUseInfo: InventoryDatabaseUseInfo): Promise<AssociateEndUser> {
		const associateEndUser = new AssociateEndUser();
		associateEndUser.operatorId = dto.operatorId;
		associateEndUser.agreeStatus = dto.agreeStatus;
		associateEndUser.tradeId = dto.tradeId;
		associateEndUser.databaseUseInfo = databaseUseInfo;
		return this.associateEndUserRepository.save(associateEndUser);
	}

	/**
	 * 準使用者情報更新
	 * @param id 使用者情報識別子
	 * @param dto ユーザー更新DTO
	 * @return 更新成功時Promise型の準使用者、更新失敗時false
	 */
	async updateAssociateEndUser(id: string, dto: UpdateUserDto): Promise<AssociateEndUser | false> {
		var associateEndUser = await this.findAssociateEndUserById(id);
		if (associateEndUser == null) return false;
		associateEndUser.agreeStatus = dto.agreeStatus;
		return this.associateEndUserRepository.save(associateEndUser);
	}

	/**
	 * 事業者識別子で準使用者のリストを探す
	 * @param operatorId 事業者識別子
	 * @return Promise型のDB情報を含む準使用者の配列
	 */
	findAssociateEndUsersByOperatorId(operatorId: string): Promise<AssociateEndUser[]> {
		return this.associateEndUserRepository.find({
			relations: ['databaseUseInfo', 'databaseUseInfo.database'],
			where: { operatorId }
		});
	}

	/**
	 * 準使用者情報識別子で特定の準使用者を探す
	 * @param id 準使用者情報識別子
	 * @return Promise型のDB情報を含む準使用者
	 */
	findAssociateEndUserById(id: string): Promise<AssociateEndUser> {
		return this.associateEndUserRepository.findOne({
			relations: ['databaseUseInfo', 'databaseUseInfo.database'],
			where: { id }
		});
	}

	/**
	 * 準使用者情報削除
	 * @param id 準使用者情報識別子
	 * @return DeleteResult
	 */
	deleteAssociateEndUserById(id: string): Promise<DeleteResult> {
		return this.associateEndUserRepository.delete({ id });
	}
}
