/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Type } from "class-transformer";
import { IsBoolean, IsUUID, ValidateNested } from "class-validator";

import { DatabaseDto } from "./database.dto";

/**
 * 使用者DTO
 */
export class EndUserDto {
    /**
     * 使用者識別子
     */
    @IsUUID()
    endUserId: string;

    /**
     * 約款同意ステータス情報
     */
    @IsBoolean()
    agreeStatus: boolean;

    /**
     * DB使用情報
     */
    @Type(() => DatabaseDto)
    @ValidateNested({ each: true })
    databaseUseInfo: DatabaseDto;
}
