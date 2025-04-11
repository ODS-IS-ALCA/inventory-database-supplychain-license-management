/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsBoolean } from "class-validator";

/**
 * ユーザー更新DTO
 */
export class UpdateUserDto {
    @IsBoolean()
    // 約款同意ステータス
    agreeStatus: boolean;
}
