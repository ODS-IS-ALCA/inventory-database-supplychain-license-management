/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { Response } from 'express';

import { AppBaseException, AppErrorException } from './exceptions';

/**
 * デフォルトのResponseBody
 */
const defaultExceptionResponseBody = {
    errors: [{
        errorCode: "EIDBEC0099",
        errorDescription: "System error occurred. Please contact system administrator."
    }]
};

/**
 * デフォルトのxTract
 */
const defaultExceptionXTract = "EIDBEC0099";

/**
 * 全範囲例外フィルター
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    /**
     * 例外発生時にresponseBodyとxTractを抽出して返す
     * @param exception 例外
     * @param host contextの抽出
     */
    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = exception instanceof AppBaseException
            ? exception.createResponseBody()
            : exception instanceof HttpException
                ? exception.getResponse()
                : defaultExceptionResponseBody;

        const res: Response = ctx.getResponse();
        const xTract = exception instanceof AppErrorException
            ? exception.getXTract()
            : httpStatus === HttpStatus.INTERNAL_SERVER_ERROR
                ? defaultExceptionXTract
                : null;

        if (xTract) res.setHeader("X-Tract", xTract);

        httpAdapter.reply(res, responseBody, httpStatus);
    }
}
