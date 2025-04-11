/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

/**
 * 利用可能DBリスト
 */
export class AvailableDbsDto {
	/**
	 * 利用可能DBリスト
	 */
	availableDbs: {
		/**
		 * 原単位データベース名
		 */
		databaseName: string;

		/**
		 * バージョン
		 */
		version: string;
	}[]
}
