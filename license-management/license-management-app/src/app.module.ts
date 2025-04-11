/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'database/database.module';
import { InventoryDatabase, InventoryDatabaseUseInfo } from 'database/entities';
import { ExternalModule } from 'external/external.module';
import { GlobalExceptionFilter } from 'license/license.filter';
import { LicenseModule } from 'license/license.module';
import { EndUser, AssociateEndUser } from 'user/entities';
import { UserModule } from 'user/user.module';

/**
 * AppModule
 */
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'database',
			port: 5432,
			username: 'postgres',
			password: 'password',
			database: 'postgres',
			entities: [EndUser, AssociateEndUser, InventoryDatabase, InventoryDatabaseUseInfo],
			synchronize: true, // for dev
			// synchronize: false, // for product
			autoLoadEntities: true,
		}),
		ConfigModule.forRoot({
			envFilePath: ['.env'],
		}),
		UserModule,
		DatabaseModule,
		LicenseModule,
		ExternalModule
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter
		}
	]
})
export class AppModule { }
