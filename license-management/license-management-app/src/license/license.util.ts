/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { AssociateEndUser, EndUser } from "user/entities";
import { AssociateEndUserDto, DatabaseDto, EndUserDto, NotAgreedAssociateEndUser } from "./dtos";

/**
 * ライセンスUtil
 */
export class LicenseUtil {
	/**
	 * DateからYYmmdd形式の文字列への変換
	 * @param date 日付
	 * @returns YYmmdd形式の日付
	 */
	dateToString(date: Date): string {
		return new Date(date).toLocaleDateString("ja-JP", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
			.split("/")
			.join("-");
	};

	/**
	 * 使用者から使用者DtoへのMapper
	 * @param endUsers 使用者のリスト
	 * @returns 使用者Dtoのリスト
	 */
	endUserMapper(endUsers: EndUser[]): EndUserDto[] {
		return endUsers.map((eu) => {
			return {
				endUserId: eu.id,
				agreeStatus: eu.agreeStatus,
				databaseUseInfo: this.getUserDatabaseInfo(eu)
			}
		});
	};

	/**
	 * 準使用者から準使用者DtoへのMapper
	 * @param aeus 準使用者のリスト
	 * @returns 準使用者DTOのリスト
	 */
	associateEndUserMapper(aeus: AssociateEndUser[]): AssociateEndUserDto[] {
		return aeus.map((aeu) => {
			return {
				associateEndUserId: aeu.id,
				agreeStatus: aeu.agreeStatus,
				databaseUseInfo: this.getUserDatabaseInfo(aeu)
			}
		});
	};

	/**
	 * 準使用者からFlatted準使用者DtoへのMapper
	 * @param aeus 準使用者のリスト
	 * @returns Flatted準使用者DTOのリスト
	 */
	associateEndUserFlatMapper(aeus: AssociateEndUser[]): NotAgreedAssociateEndUser[] {
		return aeus.map((aeu) => {
			return {
				associateEndUserId: aeu.id,
				agreeStatus: aeu.agreeStatus,
				dbUsageId: aeu.databaseUseInfo.dbUsageId,
				databaseName: aeu.databaseUseInfo.database.name,
				version: aeu.databaseUseInfo.database.version,
				licenseInfo: aeu.databaseUseInfo.licenseInfo,
				expiredDate: this.dateToString(aeu.databaseUseInfo.expiredDate)
			}
		});
	};

	/**
	 * ユーザーからデータベースを構成
	 * @param user ユーザー
	 * @returns データベースDTO
	 */
	getUserDatabaseInfo(user: EndUser | AssociateEndUser): DatabaseDto {
		return {
			dbUsageId: user.databaseUseInfo.dbUsageId,
			name: user.databaseUseInfo.database.name,
			version: user.databaseUseInfo.database.version,
			licenseInfo: user.databaseUseInfo.licenseInfo,
			expiredDate: this.dateToString(user.databaseUseInfo.expiredDate),
			usageStatus: user.databaseUseInfo.usageStatus,
		}
	};
}