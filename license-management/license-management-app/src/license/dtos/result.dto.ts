/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsBoolean } from "class-validator";

/**
 * 論理型の返事
 */
export class Result {
    /**
     * 結果
     */
    @IsBoolean()
    result: boolean;
}
