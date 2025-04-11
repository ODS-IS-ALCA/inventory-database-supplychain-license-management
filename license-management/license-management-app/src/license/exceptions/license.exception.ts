/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { HttpStatus } from '@nestjs/common';

import { ValidationError } from 'class-validator';

import { LicenseHttpException, ParameterHttpException } from './license.httpexception';
import { replaceMessage } from './utils';

/**
 * 基本パラメータ例外
 */
export class MandatoryParameterException extends LicenseHttpException {
    constructor(parameterName: string) {
        super("EIDBECL001", "EIDBECL001", replaceMessage("{0} is a required item.", [parameterName]));
    }
}

/**
 * 多重パラメータ例外
 */
export class WrongParameterException extends ParameterHttpException {
    constructor(validationErrors: ValidationError[]) {
        super("EIDBECL003", "EIDBECL003", validationErrors);
    }
}

/**
 * 事業者未特定例外
 */
export class OperatorNotExistsException extends LicenseHttpException {
    constructor() {
        super("EIDBECL004", "EIDBECL004", "The operator with id in request parameter is not exist");
    }
}

/**
 * 使用者ライセンス認証失敗例外
 */
export class EndUserLicenseAuthFailedException extends LicenseHttpException {
    constructor() {
        super("EIDBECL005", "EIDBECL005", "License authentication failed", HttpStatus.UNAUTHORIZED);
    }
}

/**
 * 準使用者ライセンス認証失敗例外
 */
export class AssociateEndUserLicenseAuthFailedException extends LicenseHttpException {
    constructor() {
        super("EIDBECL006", "EIDBECL006", "License authentication failed", HttpStatus.UNAUTHORIZED);
    }
}

/**
 * 無用トークン例外
 */
export class InvalidTokenException extends LicenseHttpException {
    constructor() {
        super("EIDBECL007", "EIDBECL007", "Invalid Token", HttpStatus.UNAUTHORIZED);
    }
}

/**
 * 未登録データベース使用情報識別子例外
 */
export class WrongDbUsageIdException extends LicenseHttpException {
    constructor() {
        super("EIDBECL008", "EIDBECL008", "DBUsage ID in the request parameter does not exist.");
    }
}

/**
 * 使用者未特定例外
 */
export class EndUserNotExistsException extends LicenseHttpException {
    constructor() {
        super("EIDBECL009", "EIDBECL009", "The End-user ID in the request parameter does not exist.");
    }
}

/**
 * 準使用者未特定例外
 */
export class AssociateEndUserNotExistsException extends LicenseHttpException {
    constructor() {
        super("EIDBECL010", "EIDBECL010", "The Associate-end-user ID in the request parameter does not exist.");
    }
}