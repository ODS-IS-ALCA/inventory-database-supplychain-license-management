/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsUUID } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

/**
 * 準使用者生成DTO
 */
export class CreateAssociateEndUserDto extends CreateUserDto {
    /**
     * 取引関係情報識別子
     */
    @IsUUID()
    tradeId: string;
}
