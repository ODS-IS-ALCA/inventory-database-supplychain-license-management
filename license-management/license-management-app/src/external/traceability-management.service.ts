/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs';

/**
 * トレーサビリティ管理サービス
 */
@Injectable()
export class ExTraceabilityManagementService {
	constructor(private readonly httpService: HttpService) { }

	/**
	 * Traceabilityシステムと連携した上で取引関係情報識別子を通じて関連づけられた事業者識別子を取得
	 * @param operatorId 準使用者識別子
	 * @param tradeId 取引関係情報識別子
	 * @returns 事業者識別子のリスト
	 * @throws failed to post data Error
	 */
	async getBottomTradeOperators(operatorId: string, tradeId: string): Promise<string[]> {
		const url = process.env.TRACEABILITY_SERVICE_URL + '/tradeOperators';
		const requestJson = { operatorId, tradeId };
		try {
			const response = await lastValueFrom(this.httpService.post(url, requestJson));
			return response.data;
		} catch (error) {
			throw new Error(`Failed to post data: ${error.message}`);
		}
	}
}