/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { HttpException } from "@nestjs/common";

import { CanGetXTract, ResponseBodyCreatable } from "./types";

/**
 * App全体のベース例外
 * 
 * responseObjectを持つ
 */
export class AppBaseException extends HttpException implements ResponseBodyCreatable {
	_responseObject: any;

	createResponseBody(): any {
		return this._responseObject;
	}
}

/**
 * xTractを持つ例外
 * 
 * xTractを持つ
 */
export class AppErrorException extends AppBaseException implements CanGetXTract {
	_xTract: string;

	getXTract(): string {
		return this._xTract;
	}
}