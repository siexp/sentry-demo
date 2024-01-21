# sentry-demo
## nextjs
Next.JS FE + Nest.JS BE + PostgreSQL DB

npx create-next-app@latest ./ --use-npm 
npx @sentry/wizard@latest -i nextjs
npm run dev
npm i --save-dev @types/uuid

## nestjs
create sentry project, node
add `SENTRY_DNS=https://151ca0adf35ca19359b08d4e6d207f55@o4506599345946624.ingest.sentry.io/4506599348240384`

## env
```bash
docker pull postgres
docker run --name sentry-demo-db \
    -p 5432:5432 \
    -e POSTGRES_USER=user \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=db \
    postgres
```

## prisma
add DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"

npm install prisma --save-dev
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name init



 curl -X POST http://localhost:3000/users/create \
    -H "sentry-trace: "`uuid` \
    -d '{
        "email": "user@example.com",
        "name": "siexp"
    }'