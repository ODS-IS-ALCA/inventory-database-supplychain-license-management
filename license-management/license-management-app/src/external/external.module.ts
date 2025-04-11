/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ExTraceabilityManagementService } from 'external/traceability-management.service';

/**
 * 外部モジュール
 */
@Module({
	imports: [HttpModule],
	providers: [ExTraceabilityManagementService],
	exports: [ExTraceabilityManagementService]
})
export class ExternalModule { }