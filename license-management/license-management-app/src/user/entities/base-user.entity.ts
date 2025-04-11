/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * ベースユーザー
 */
export class BaseUser {
	/**
	 * 使用者情報識別子
	 */
	@PrimaryGeneratedColumn("uuid")
	id: string;

	/**
	 * 事業者識別子
	 */
	@Column({ type: 'varchar' })
	operatorId: string;

	/**
	 * 約款同意ステータス情報
	 */
	@Column({ type: 'boolean' })
	agreeStatus: boolean;
}
