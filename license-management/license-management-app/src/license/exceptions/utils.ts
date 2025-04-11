/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

/**
 * テンプレにパラメータ挿入
 * @param template 元の文字列
 * @param params パラメータ
 * @returns 変換済みの文字列
 */
export const replaceMessage = (template, params): string => {
	return template.split(/\{(\d+)\}/).map((part, index) =>
		index % 2 === 1 ? params[part] : part
	).join("");
}
