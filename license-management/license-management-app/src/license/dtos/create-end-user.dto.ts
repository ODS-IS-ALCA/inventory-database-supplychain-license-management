/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { CreateDatabaseDto } from "database/dtos";
import { CreateUserDto } from "user/dtos";

/**
 * 使用者生成DTO
 */
export class CreateEndUserDto extends CreateUserDto {
	/**
	 * DB情報DTO
	 */
	@Type(() => CreateDatabaseDto)
	@ValidateNested({ each: true })
	databaseUseInfo: CreateDatabaseDto;
}
