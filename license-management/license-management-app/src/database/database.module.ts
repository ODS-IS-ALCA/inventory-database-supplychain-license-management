/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseService } from './database.service';
import { InventoryDatabase, InventoryDatabaseUseInfo } from './entities';

/**
 * DBモジュール
 */
@Module({
	imports: [TypeOrmModule.forFeature([InventoryDatabase, InventoryDatabaseUseInfo])],
	providers: [DatabaseService],
	exports: [DatabaseService],
})
export class DatabaseModule { }
