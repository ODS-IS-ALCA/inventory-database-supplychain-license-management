/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { UpdateDatabaseDto } from "database/dtos";
import { UpdateUserDto } from "user/dtos";

/**
 * 使用者更新DTO
 */
export class UpdateEndUserDto extends UpdateUserDto {
    /**
     * DB更新DTO
     */
    @Type(() => UpdateDatabaseDto)
    @ValidateNested({ each: true })
    databaseUseInfo: UpdateDatabaseDto;
}
