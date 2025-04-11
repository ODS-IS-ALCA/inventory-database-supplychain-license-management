/**
 * Copyright (c) 2025 Automotive and Battery Traceability Center Association Inc. All rights reserved.
 * This software is released under the MIT License, see LICENSE.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { LicenseExceptionFactory } from 'license/exceptions';
import { AppModule } from './app.module';

/**
 * bootstrap nest app
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory: LicenseExceptionFactory }));
  await app.listen(process.env.PORT);
}

bootstrap();
