import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { SentryFilter } from './sentry.filter';

async function bootstrap() {
  // Initialize Sentry by passing the DNS included in the .env
  Sentry.init({
    dsn: 'https://151ca0adf35ca19359b08d4e6d207f55@o4506599345946624.ingest.sentry.io/4506599348240384',
    // integrations: [],
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      // The Undici integrations instruments fetch in Node 18+
      new Sentry.Integrations.Undici(),
      new Sentry.Integrations.Postgres(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
    release: '0.0.1',
  });

  const app = await NestFactory.create(AppModule);

  // Import the filter globally, capturing all exceptions on all routes
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
