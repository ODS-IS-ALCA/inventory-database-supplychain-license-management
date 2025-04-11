/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

/**
 * DB情報DTO
 */
export class DatabaseDto {
	/**
	 * データベース使用識別子
	 */
	dbUsageId: string;

	/**
	 * データベース名
	 */
	name: string;

	/**
	 * バージョン
	 */
	version: string;

	/**
	 * ライセンス情報
	 */
	licenseInfo: string;

	/**
	 * 有効期限年月日
	 */
	expiredDate: string;

	/**
	 * データベース使用ステータス情報
	 */
	usageStatus: "valid" | "expired" | "suspended" | "invalid";
}
