/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsBoolean, IsString, IsUUID } from "class-validator"

export class NotAgreedAssociateEndUser {
	/**
	 * 準使用者情報識別子
	 */
	@IsUUID()
	associateEndUserId: string;

	/**
	 * 約款同意ステータス
	 */
	@IsBoolean()
	agreeStatus: boolean;

	/**
	 * 原単位データベース名
	 */
	@IsString()
	databaseName: string;

	/**
	 * バージョン
	 */
	@IsString()
	version: string;

	/**
	 * ライセンス情報
	 */
	@IsString()
	licenseInfo: string;

	/**
	 * ライセンス有効期限
	 */
	@IsString()
	expiredDate: string;
}