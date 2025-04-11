/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { InvalidTokenException } from "./exceptions";

/**
 * ライセンス認証Guard
 */
@Injectable()
export class LicenseGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) { }

    /**
     * requestからtokenの認証を行いpayloadを抽出してrequestに載せる
     * @param context requestの抽出元
     * @returns true
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const secret = process.env.JWT_SECRET;

        const request = context.switchToHttp().getRequest();
        const payload = await this.verifyToken(request, secret);

        // payloadをそのままreqに渡す
        request['payload'] = payload;

        return true;
    }

    /**
     * requestからトークンを抽出して認証を行い、トークンの複合化を行う
     * @param request リクエスト
     * @param secret jwt tokenのシークレット
     * @returns トークンの複合化
     */
    private async verifyToken(request: Request, secret: string): Promise<object> {
        const token = this.extractToken(request);

        try {
            return await this.jwtService.verifyAsync(token, { secret });
        } catch {
            throw new InvalidTokenException();
        }
    }

    /**
     * リクエストからアクセストークンを抽出
     * @param request リクエスト
     * @returns アクセストークン
     */
    private extractToken(request: Request): string {
        const headers: any = { ...request.headers };
        const accessToken = headers['accesstoken']; //header key is converted to small case

        if (accessToken == null) {
            throw new InvalidTokenException();
        }
        return accessToken;
    }
}