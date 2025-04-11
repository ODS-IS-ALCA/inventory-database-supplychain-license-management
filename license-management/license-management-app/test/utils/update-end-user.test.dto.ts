/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { LicenseUtil } from "license/license.util"

export const getUpdateEndUserTestDto = (dbUsageId: string) => {
	const date = new Date();
	date.setDate(date.getDate() + 1);
	return {
		"agreeStatus": true,
		"databaseUseInfo": {
			"dbUsageId": dbUsageId,
			"name": "IDEA",
			"version": "3.4.0",
			"licenseInfo": "TBD",
			"expiredDate": new LicenseUtil().dateToString(date),
			"usageStatus": "valid"
		}
	}
}