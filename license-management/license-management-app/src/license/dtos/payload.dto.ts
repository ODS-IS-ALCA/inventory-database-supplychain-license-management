/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsBoolean, IsString } from "class-validator";

/**
 * jwtのpayload
 */
export class Payload {
    /**
     * 事業者識別子
     */
    @IsString()
    sub: string;

    /**
     * 使用者判定
     */
    @IsBoolean()
    isEndUser: boolean;
}
