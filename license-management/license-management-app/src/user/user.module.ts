/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EndUser, AssociateEndUser } from 'user/entities';
import { UserService } from 'user/user.service';

/**
 * ユーザーモジュール
 */
@Module({
	imports: [TypeOrmModule.forFeature([EndUser, AssociateEndUser])],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule { }
