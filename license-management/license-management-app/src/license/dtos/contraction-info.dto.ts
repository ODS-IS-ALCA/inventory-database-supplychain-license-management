/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsUUID } from "class-validator";

/**
 * 契約情報DTO
 */
export class ContractionInfoDto {
    /**
     * 取引関係情報識別子
     */
    @IsUUID()
    tradeId: string;
}
