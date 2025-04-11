/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { HttpException, HttpStatus } from "@nestjs/common";

import { ValidationError } from "class-validator";

import { AppErrorException } from "./app.exception";
import { ExceptionResponseBody } from "./types";
import { replaceMessage } from "./utils";

/**
 * ライセンスHTTP例外
 * 
 * 415 Bad Request
 */
export class LicenseHttpException extends AppErrorException {
	_responseObject: ExceptionResponseBody;

	constructor(xTract: string, errorCode: string, message = "", statusCode = HttpStatus.BAD_REQUEST) {
		super(HttpException.createBody(errorCode, message, statusCode), statusCode);
		this._xTract = xTract;
		this._responseObject = {
			errors:
				[{
					errorCode: errorCode,
					errorDescription: message
				}]
		}
	}
}

/**
 * パラメータHTTP例外
 * 
 * 415 Bad Request
 */
export class ParameterHttpException extends AppErrorException {
	_responseObject: ExceptionResponseBody;

	constructor(xTract: string, errorCode: string, validationErrors: ValidationError[] = [], statusCode = HttpStatus.BAD_REQUEST) {
		super(HttpException.createBody(errorCode, "", statusCode), statusCode);

		this._xTract = xTract;
		this._responseObject = {
			errors: validationErrors.map((error) => {
				return {
					errorCode,
					errorDescription: replaceMessage("The value in {0} is invalid.", [error.property])
				}
			})
		}
	}
}