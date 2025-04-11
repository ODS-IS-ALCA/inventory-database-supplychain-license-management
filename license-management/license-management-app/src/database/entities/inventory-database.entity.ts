/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * データベース情報
 */
@Entity()
export class InventoryDatabase {
    /**
     * データベース情報識別子
     */
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * データベース名
     */
    @Column({ type: 'varchar' })
    name: string;

    /**
     * バージョン
     */
    @Column({ type: 'varchar' })
    version: string;
}
