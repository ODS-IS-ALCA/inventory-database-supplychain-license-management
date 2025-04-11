/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { ValidationError } from "class-validator";

import { WrongParameterException } from ".";

/**
 * ライセンス例外生成
 * @param validationErrors 有効じゃないパラメーターのエラー
 * @returns WrongParameterException
 */
export const LicenseExceptionFactory = (validationErrors: ValidationError[] = []) => {
    return new WrongParameterException(validationErrors);
};