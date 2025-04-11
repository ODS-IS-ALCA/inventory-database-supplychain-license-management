/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { InventoryDatabase } from './inventory-database.entity';

/**
 * データベース使用情報
 */
@Entity()
export class InventoryDatabaseUseInfo {
    /**
     * データベース使用情報識別子
     */
    @PrimaryGeneratedColumn("uuid")
    dbUsageId: string;

    /**
     * ライセンス有効期限
     */
    @Column({ type: 'date' })
    expiredDate: Date;

    /**
     * データベース使用ステータス情報
     * 
     * valid expired suspended invalidのうち一つの値を持つ
     */
    @Column({ type: 'varchar' })
    usageStatus: "valid" | "expired" | "suspended" | "invalid";

    /**
     * ライセンス情報
     */
    @Column({ type: 'varchar' })
    licenseInfo: string;

    /**
     * データベース情報
     */
    @JoinColumn()
    @OneToOne(() => InventoryDatabase, database => database.id, { cascade: true })
    database: InventoryDatabase;
}
