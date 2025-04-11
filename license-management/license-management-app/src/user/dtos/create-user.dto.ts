/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsBoolean, IsUUID } from "class-validator";

/**
 * ユーザー生成DTO
 */
export class CreateUserDto {
    /**
     * 事業者識別子
     */
    @IsUUID()
    operatorId: string;

    /**
     * 約款同意ステータス
     */
    @IsBoolean()
    agreeStatus: boolean;
}
