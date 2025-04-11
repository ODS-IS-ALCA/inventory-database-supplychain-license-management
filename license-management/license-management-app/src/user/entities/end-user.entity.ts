/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Entity, JoinColumn, OneToOne } from 'typeorm';

import { InventoryDatabaseUseInfo } from 'database/entities';
import { BaseUser } from './base-user.entity';

/**
 * 使用者情報
 */
@Entity()
export class EndUser extends BaseUser {
  /**
   * 原単位データベース使用者情報
   * 
   * 一対一対応
   * 
   * ユーザー削除時DatabaseUseInfoも削除される
   */
  @JoinColumn()
  @OneToOne(() => InventoryDatabaseUseInfo, databaseUseInfo => databaseUseInfo.dbUsageId, { onDelete: "CASCADE" })
  databaseUseInfo: InventoryDatabaseUseInfo;
}
