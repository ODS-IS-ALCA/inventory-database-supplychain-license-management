/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Result, AssociateEndUsers } from 'license/dtos';
import { LicenseService } from 'license/license.service';
import { UpdateUserDto } from 'user/dtos';

/**
 * ライセンス使用者コントローラー
 * 
 * /license/associateEndUser以下のパスを持つ
 */
@Controller('license/associateEndUser')
export class LicenseAssociateEndUserController {
	constructor(
		private readonly licenseService: LicenseService,
	) { }

	/**
	 * 準使用者情報更新
	 * 
	 * パスは'/license/associateEndUser/:id'
	 * 
	 * post限定
	 * @param id 準使用者識別子
	 * @param dto ユーザー更新DTO
	 * @returns 論理型
	 */
	@Post(':id')
	updateAssociateEndUserInfo(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<Result> {
		return this.licenseService.updateAssociateEndUserInfo(id, dto);
	}

	/**
	 * 事業者識別子から準使用者情報のリストを取得
	 * 
	 * パスは'/license/associateEndUser/:operatorId'
	 * 
	 * get限定
	 * @param operatorId 事業者識別子
	 * @returns 準使用者情報DTOのリスト
	 */
	@Get(':operatorId')
	getAssociateEndUserInfo(@Param('operatorId') operatorId: string): Promise<AssociateEndUsers> {
		return this.licenseService.getAssociateEndUserInfo(operatorId);
	}
}
