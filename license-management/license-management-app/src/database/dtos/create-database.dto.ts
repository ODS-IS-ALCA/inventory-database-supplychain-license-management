/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { IsEnum, IsString, MaxLength } from "class-validator";

/**
 * DB情報生成DTO
 */
export class CreateDatabaseDto {
    /**
     * データベース名
     */
    @IsString()
    databaseName: string;

    /**
     * バージョン
     */
    @IsString()
    version: string;

    /**
     * ライセンス情報
     */
    @IsString()
    licenseInfo: string;

    /**
     * 有効期限年月日
     * 
     * 長さ最大10
     */
    @IsString()
    @MaxLength(10)
    expiredDate: string;

    /**
     * データベース使用ステータス情報
     * 
     * valide expired suspended invalidのうち一つの値を持つ
     */
    @IsEnum(["valid", "expired", "suspended", "invalid"])
    usageStatus: "valid" | "expired" | "suspended" | "invalid";
}
