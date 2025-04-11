/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsUUID } from "class-validator";
import { CreateDatabaseDto } from "./create-database.dto";

/**
 * DB情報更新DTO
 */
export class UpdateDatabaseDto extends CreateDatabaseDto {
    /**
     * データベース使用識別子
     */
    @IsUUID()
    dbUsageId: string;
}
