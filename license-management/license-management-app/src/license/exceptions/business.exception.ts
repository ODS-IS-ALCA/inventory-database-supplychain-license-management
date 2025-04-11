/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { NotAgreedAssociateEndUser } from 'license/dtos';
import { AppBaseException } from './app.exception';

/**
 * 準使用者約款未同意例外
 * 
 * 415 Unsupported Media Type、渡されるオブジェクトをそのまま渡す
 */
export class AssociateEndUserNotAgreedException extends AppBaseException {
    constructor(responseObject: NotAgreedAssociateEndUser[]) {
        super('', 415);
        this._responseObject = responseObject;
    }
}