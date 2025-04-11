/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { AccessToken, AvailableDbsDto, ContractionInfoDto } from 'license/dtos';
import { LicenseGuard } from 'license/license.guard';
import { LicenseService } from 'license/license.service';

/**
 * ライセンス認証コントローラー
 * 
 * /license/auth以下のパスを持つ
 */
@Controller('license/auth')
export class LicenseAuthController {
	constructor(
		private readonly licenseService: LicenseService,
	) { }

	/**
	 * 使用者の事業者識別子からアクセストークンを生成
	 * 
	 * パスは'/license/auth/endUser/:operatorId'
	 * 
	 * post限定
	 * @param operatorId 事業者識別子
	 * @returns アクセストークン
	 */
	@Post('endUser/:operatorId')
	getAccessTokenByEndUserOperatorId(@Param('operatorId') operatorId: string): Promise<AccessToken> {
		return this.licenseService.getAccessTokenByEndUserOperatorId(operatorId);
	}

	/**
	 * 準使用者の事業者識別子からアクセストークンを生成
	 * 
	 * パスは'/license/auth/associateEndUser/:operatorId'
	 * 
	 * post限定
	 * @param operatorId 事業者識別子
	 * @param dto 契約情報DTO
	 * @returns アクセストークン
	 */
	@Post('associateEndUser/:operatorId')
	getAccessTokenByAssociateEndUserOperatorId(@Param('operatorId') operatorId: string, @Body() dto: ContractionInfoDto): Promise<AccessToken> {
		return this.licenseService.getAccessTokenByAssociateEndUserOperatorId(operatorId, dto);
	}

	/**
	 * 利用可能データベースDTOのリストの取得
	 * 
	 * パスは'/license/auth/availabledbs'
	 * 
	 * get限定
	 * @param req リクエスト
	 * @returns 利用可能データベースDTOのリスト
	 */
	@UseGuards(LicenseGuard)
	@Get('availabledbs')
	getAvailableDatabases(@Request() req): Promise<AvailableDbsDto> {
		return this.licenseService.getAvailableDatabases(req.payload);
	}
}
