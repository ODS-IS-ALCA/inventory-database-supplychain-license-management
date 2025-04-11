/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from 'database/database.module';
import { ExternalModule } from 'external/external.module';
import { UserModule } from 'user/user.module';
import { LicenseAuthController, LicenseEndUserController, LicenseAssociateEndUserController } from './controllers';
import { LicenseService } from './license.service';

/**
 * ライセンスモジュール
 */
@Module({
	imports: [
		UserModule,
		DatabaseModule,
		ExternalModule,
		JwtModule.register({}),
	],
	controllers: [LicenseAuthController, LicenseEndUserController, LicenseAssociateEndUserController],
	providers: [LicenseService],
})
export class LicenseModule { }
