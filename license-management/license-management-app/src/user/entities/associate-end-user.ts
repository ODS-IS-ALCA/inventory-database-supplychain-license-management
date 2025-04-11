/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Column, Entity, ManyToOne } from 'typeorm';

import { InventoryDatabaseUseInfo } from 'database/entities';
import { BaseUser } from './base-user.entity';

/**
 * 準使用者
 */
@Entity()
export class AssociateEndUser extends BaseUser {
	/**
	 * 取引関係情報識別子
	 */
	@Column({ type: 'varchar' })
	tradeId: string;

	/**
	 * 原単位データベース使用者情報
	 * 
	 * 多対一対応
	 */
	@ManyToOne(() => InventoryDatabaseUseInfo, databaseUseInfo => databaseUseInfo.dbUsageId)
	databaseUseInfo: InventoryDatabaseUseInfo;
}
