import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@prisma/client';
import * as Sentry from '@sentry/node';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @HttpCode(200)
  health(): object {
    return this.appService.health();
  }

  @Get('/users')
  @HttpCode(200)
  async users(@Param('id') id: string): Promise<User[]> {
    return await this.appService.users();
  }

  @Post('/users/create')
  @HttpCode(201)
  async create(@Body() user: User, @Req() req: Request): Promise<string> {
    console.log(req.headers);

    const sentryTraceHeaders = req.headers['sentry-trace'];
    const sentryTrace = Array.isArray(sentryTraceHeaders)
      ? sentryTraceHeaders.join(',')
      : sentryTraceHeaders;
    const baggage = req.headers['baggage'];

    return await Sentry.continueTrace({ sentryTrace, baggage }, async () => {
      return await Sentry.startSpan(
        {
          name: 'my request',
          op: 'http.server',
        },
        async (span) => {
          return await this.appService.create(user);
        },
      );
    });
  }

  @Get('/throw')
  @HttpCode(500)
  throwError(): string {
    return this.appService.throwError();
  }
}
