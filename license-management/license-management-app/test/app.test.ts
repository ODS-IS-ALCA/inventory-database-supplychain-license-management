/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as request from 'supertest';

import { DatabaseModule } from 'database/database.module';
import { InventoryDatabase, InventoryDatabaseUseInfo } from 'database/entities';
import { ExternalModule } from 'external/external.module';
import { AccessToken, AssociateEndUsers, AvailableDbsDto, EndUsers, Result } from 'license/dtos';
import { GlobalExceptionFilter } from 'license/license.filter';
import { LicenseModule } from 'license/license.module';
import { AssociateEndUser, EndUser } from 'user/entities';
import { UserModule } from 'user/user.module';
import { AssociateEndUserTestDto, AuthenticateAssociateEndUserTestDto, CreateEndUserTestDto, getUpdateEndUserTestDto, UpdateAssociateEndUserTestDto } from './utils';

describe('テスト', () => {
	let app: INestApplication;
	let moduleFixture: TestingModule;

	beforeEach(async () => {
		moduleFixture = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: 'postgres',
					host: 'localhost',
					port: 5433,
					username: 'postgres',
					password: 'password',
					database: 'postgres',
					entities: [EndUser, AssociateEndUser, InventoryDatabaseUseInfo, InventoryDatabase],
					synchronize: true,
					autoLoadEntities: true,
				}),
				ConfigModule.forRoot({
					envFilePath: ['.env.test'],
				}),
				UserModule,
				DatabaseModule,
				LicenseModule,
				ExternalModule
			],
			providers: [
				{
					provide: APP_FILTER,
					useClass: GlobalExceptionFilter
				}
			],
		}).compile();

		// Nestアプリケーションの起動
		app = moduleFixture.createNestApplication();
		await app.init();
	});

	/**
	 * 使用者情報登録&取得テスト（正常系）
	 */
	it('使用者情報登録&取得テスト（正常系）', async () => {
		// 登録テスト
		const createRes: { body: Result } = await request(app.getHttpServer())
			.post('/license/endUser/')
			.send(CreateEndUserTestDto)
			.expect(201);

		// 登録完了の確認
		expect(createRes.body.result).toEqual(true);

		// 取得テスト
		const getRes: { body: EndUsers } = await request(app.getHttpServer())
			.get(`/license/endUser/${CreateEndUserTestDto.operatorId}`)
			.send()
			.expect(200);

		// 一つ以上の値が返ってくるかの確認
		expect(getRes.body.endUsers.length).toBeGreaterThanOrEqual(1);

		// 上で追加したテストユーザーの情報をもつ使用者がいるか確認
		expect(getRes.body.endUsers.map((endUser) => {
			return {
				operatorId: CreateEndUserTestDto.operatorId,
				agreeStatus: endUser.agreeStatus,
				databaseUseInfo: {
					databaseName: endUser.databaseUseInfo.name,
					version: endUser.databaseUseInfo.version,
					licenseInfo: endUser.databaseUseInfo.licenseInfo,
					expiredDate: endUser.databaseUseInfo.expiredDate,
					usageStatus: endUser.databaseUseInfo.usageStatus
				}
			}
		})).toEqual(expect.arrayContaining([CreateEndUserTestDto]));
	});

	/**
	 * 使用者情報更新テスト（正常系）
	 */
	it('使用者情報更新テスト（正常系）', async () => {
		// 登録
		await request(app.getHttpServer())
			.post('/license/endUser/')
			.send(CreateEndUserTestDto);

		// 取得
		const getRes: { body: EndUsers } = await request(app.getHttpServer())
			.get(`/license/endUser/${CreateEndUserTestDto.operatorId}`)
			.send();

		// 更新テスト
		const updateTargetEndUser = getRes.body.endUsers[0];
		const updateEndUserTestDto = getUpdateEndUserTestDto(updateTargetEndUser.databaseUseInfo.dbUsageId);
		const updateRes: { body: Result } = await request(app.getHttpServer())
			.post(`/license/endUser/${updateTargetEndUser.endUserId}`)
			.send(updateEndUserTestDto)
			.expect(201);

		// 更新完了確認
		expect(updateRes.body.result).toEqual(true);

		// 取得
		const getUpdatedRes: { body: EndUsers } = await request(app.getHttpServer())
			.get(`/license/endUser/${CreateEndUserTestDto.operatorId}`)
			.send();

		// 上で追加したテストユーザーの情報をもつ使用者がいるか確認
		expect(getUpdatedRes.body.endUsers.map((endUser) => {
			return {
				agreeStatus: endUser.agreeStatus,
				databaseUseInfo: endUser.databaseUseInfo
			}
		})).toEqual(expect.arrayContaining([updateEndUserTestDto]));
	});

	/**
	 * 使用者認証&使用可能DB一覧テスト（正常系）
	 */
	it('使用者認証&使用可能DB一覧テスト（正常系）', async () => {
		// 登録
		await request(app.getHttpServer())
			.post('/license/endUser/')
			.send(CreateEndUserTestDto);

		// 取得
		const getRes: { body: EndUsers } = await request(app.getHttpServer())
			.get(`/license/endUser/${CreateEndUserTestDto.operatorId}`)
			.send();

		// 更新
		const updateTargetEndUser = getRes.body.endUsers[0];
		const updateEndUserTestDto = getUpdateEndUserTestDto(updateTargetEndUser.databaseUseInfo.dbUsageId);
		const updateRes: { body: Result } = await request(app.getHttpServer())
			.post(`/license/endUser/${updateTargetEndUser.endUserId}`)
			.send(updateEndUserTestDto);

		// 認証テスト
		const authenticateRes: { body: AccessToken } = await request(app.getHttpServer())
			.post(`/license/auth/endUser/${CreateEndUserTestDto.operatorId}`)
			.send()
			.expect(201);

		// 使用可能DB一覧テスト
		const availableDBsRes: { body: AvailableDbsDto } = await request(app.getHttpServer())
			.get('/license/auth/availabledbs')
			.set('accessToken', authenticateRes.body.accessToken)
			.send()
			.expect(200);

		// 使用可能DB一覧から更新したDBと同じものがあるか確認
		expect(availableDBsRes.body.availableDbs).toEqual(expect.arrayContaining([{
			databaseName: updateEndUserTestDto.databaseUseInfo.name,
			version: updateEndUserTestDto.databaseUseInfo.version
		}]));
	});

	/**
	 * 準使用者情報認証&更新&取得テスト（正常系）
	 */
	it('準使用者情報認証&更新&取得テスト（正常系）', async () => {
		// 使用者登録
		await request(app.getHttpServer())
			.post('/license/endUser/')
			.send(CreateEndUserTestDto);

		// 使用者情報取得
		const getEndUserRes: { body: EndUsers } = await request(app.getHttpServer())
			.get(`/license/endUser/${CreateEndUserTestDto.operatorId}`)
			.send();

		const endUser = getEndUserRes.body.endUsers[0];

		// 準使用者認証
		await request(app.getHttpServer())
			.post(`/license/auth/associateEndUser/${AssociateEndUserTestDto.operatorId}`)
			.send(AuthenticateAssociateEndUserTestDto);

		// 準使用者取得テスト
		const getRes: { body: AssociateEndUsers } = await request(app.getHttpServer())
			.get(`/license/associateEndUser/${AssociateEndUserTestDto.operatorId}`)
			.send()
			.expect(200);

		// 準使用者更新テスト
		const updateRes: { body: Result } = await request(app.getHttpServer())
			.post(`/license/associateEndUser/${getRes.body.associateEndUsers[0].associateEndUserId}`)
			.send(UpdateAssociateEndUserTestDto)
			.expect(201);

		// 更新結果の確認
		expect(updateRes.body.result).toEqual(true);

		// 準使用者認証テスト
		const associateEndUserAuthenticateRes: { body: AccessToken } = await request(app.getHttpServer())
			.post(`/license/auth/associateEndUser/${AssociateEndUserTestDto.operatorId}`)
			.send(AuthenticateAssociateEndUserTestDto)
			.expect(201);

		// 使用可能DB一覧テスト
		const availableDBsRes: { body: AvailableDbsDto } = await request(app.getHttpServer())
			.get('/license/auth/availabledbs')
			.set('accessToken', associateEndUserAuthenticateRes.body.accessToken)
			.send()
			.expect(200);

		// 確認
		expect(availableDBsRes.body.availableDbs).toEqual(expect.arrayContaining([{
			databaseName: endUser.databaseUseInfo.name,
			version: endUser.databaseUseInfo.version
		}]))
	});

	// テストで起動したNestアプリを終了しないとJestで警告が発生するため、以下のコードで終了
	afterEach(async () => {
		await app.close();
		await moduleFixture.close();
	});
});