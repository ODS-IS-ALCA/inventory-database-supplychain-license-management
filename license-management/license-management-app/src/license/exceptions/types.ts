/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

/**
 * 例外の返し
 */
type ExceptionError = {
	/**
	 * エラーコード
	 */
	errorCode: string,
	/**
	 * エラーの詳細
	 */
	errorDescription: string
}

/**
 * 例外ResponseBody
 */
export type ExceptionResponseBody = {
	/**
	 * エラー一覧
	 */
	errors: ExceptionError[]
};

/**
 * ResponseBody生成可能
 */
export type ResponseBodyCreatable = {
	createResponseBody: () => any
}

/**
 * xTract取得可能
 */
export type CanGetXTract = {
	getXTract: () => string
}
