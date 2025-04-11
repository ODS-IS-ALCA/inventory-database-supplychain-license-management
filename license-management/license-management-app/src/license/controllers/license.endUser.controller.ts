/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateEndUserDto, EndUsers, Result, UpdateEndUserDto } from 'license/dtos';
import { LicenseService } from 'license/license.service';

/**
 * ライセンス使用者コントローラー
 * 
 * /license/endUser以下のパスを持つ
 */
@Controller('license/endUser')
export class LicenseEndUserController {
	constructor(
		private readonly licenseService: LicenseService,
	) { }

	/**
	 * 使用者生成
	 * 
	 * パスは'/license/endUser'
	 * 
	 * post限定
	 * @param dto 使用者生成DTO
	 * @returns 論理型
	 */
	@Post('/')
	createEndUser(@Body() dto: CreateEndUserDto): Promise<Result> {
		return this.licenseService.createEndUser(dto);
	}

	/**
	 * 使用者情報更新
	 * 
	 * パスは'/license/endUser/:id'
	 * 
	 * post限定
	 * @param id 使用者識別子
	 * @param dto 使用者更新DTO
	 * @returns 論理型
	 */
	@Post(':id')
	updateEndUserInfo(@Param('id') id: string, @Body() dto: UpdateEndUserDto): Promise<Result> {
		return this.licenseService.updateEndUserInfo(id, dto);
	}

	/**
	 * 使用者情報取得
	 * 
	 * パスは'/license/endUser/:operatorId'
	 * 
	 * get限定
	 * @param operatorId 事業者識別子
	 * @returns 使用者情報のリスト
	 */
	@Get(':operatorId')
	getEndUserInfo(@Param('operatorId') operatorId: string): Promise<EndUsers> {
		return this.licenseService.getEndUserInfo(operatorId);
	}
}
