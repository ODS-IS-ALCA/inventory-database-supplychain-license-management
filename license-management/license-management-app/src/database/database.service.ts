/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDatabaseDto, UpdateDatabaseDto } from './dtos';
import { InventoryDatabase, InventoryDatabaseUseInfo } from './entities';

/**
 * DBサービス
 */
@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(InventoryDatabaseUseInfo) private readonly eIDatabaseUseRepository: Repository<InventoryDatabaseUseInfo>,
    ) { }

    /**
     * DB使用情報生成
     * @param dto DB情報生成DTO
     * @returns データベース使用情報
     */
    createDatabaseUseInfo(dto: CreateDatabaseDto): Promise<InventoryDatabaseUseInfo> {
        const databaseUseInfo = new InventoryDatabaseUseInfo();
        databaseUseInfo.expiredDate = new Date(dto.expiredDate);
        databaseUseInfo.usageStatus = dto.usageStatus;
        databaseUseInfo.licenseInfo = dto.licenseInfo;
        const databaseInfo = new InventoryDatabase();
        databaseInfo.name = dto.databaseName;
        databaseInfo.version = dto.version;
        databaseUseInfo.database = databaseInfo;
        return this.eIDatabaseUseRepository.save(databaseUseInfo);
    }

    /**
     * DB使用情報更新
     * @param dto DB情報更新DTO
     * @param databaseUseInfo データベース使用情報
     * @returns データベース使用情報
     */
    updateDatabaseUseInfo(dto: UpdateDatabaseDto, databaseUseInfo: InventoryDatabaseUseInfo): Promise<InventoryDatabaseUseInfo> {
        databaseUseInfo.expiredDate = new Date(dto.expiredDate);
        databaseUseInfo.usageStatus = dto.usageStatus;
        databaseUseInfo.licenseInfo = dto.licenseInfo;
        databaseUseInfo.database.name = dto.databaseName;
        databaseUseInfo.database.version = dto.version;
        return this.eIDatabaseUseRepository.save(databaseUseInfo);
    }
}
