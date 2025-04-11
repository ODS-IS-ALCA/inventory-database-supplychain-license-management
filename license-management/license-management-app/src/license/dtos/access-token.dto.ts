/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsString } from "class-validator";

/**
 * アクセストークン
 */
export class AccessToken {
    @IsString()
    accessToken: string;
}
