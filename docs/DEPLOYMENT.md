# Production Deployment Guide

*The Appliance Clinic Enterprise Management Platform*

---

## Prerequisites

- Docker Engine v24+
- Docker Compose v2.24+
- Node.js v20+ (for local builds and schema migrations)
- PostgreSQL client tools (optional, for manual DB access)
- A secrets manager or `.env` file with all required secrets (see below)

---

## Environment Variables

**Never hardcode secrets in source files or Docker Compose files.** All sensitive values must be supplied via environment variables.

Copy `docker/.env.example` to `docker/.env` and fill in all required values:

```bash
cp docker/.env.example docker/.env
```

| Variable            | Required | Description                                              |
|---------------------|----------|----------------------------------------------------------|
| `POSTGRES_USER`     | ✅       | PostgreSQL superuser name                                |
| `POSTGRES_PASSWORD` | ✅       | PostgreSQL superuser password (min 32 chars recommended) |
| `POSTGRES_DB`       | ✅       | PostgreSQL database name                                 |
| `DATABASE_URL`      | ✅       | Full Prisma connection string                            |
| `JWT_SECRET`        | ✅       | JWT signing secret (min 64 chars, cryptographically random) |
| `ALLOWED_ORIGINS`   | ✅       | Comma-separated list of allowed CORS origins             |
| `NEXT_PUBLIC_API_URL` | ✅     | Full URL to the API gateway (accessible from browser)   |

---

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the database and services:**
   ```bash
   docker-compose -f docker/dev.dockercompose.yml up -d
   ```

3. **Push the Prisma schema to the database:**
   ```bash
   npx prisma db push --schema=packages/database/prisma/schema.prisma
   ```

4. **Run development servers:**
   ```bash
   npx turbo run dev
   ```

---

## Production Deployment

1. **Build and push Docker images** (or use the CI/CD pipeline):
   ```bash
   docker-compose -f docker/prod.dockercompose.yml build
   ```

2. **Run database migrations:**
   ```bash
   npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma
   ```

3. **Start production containers:**
   ```bash
   docker-compose -f docker/prod.dockercompose.yml up -d
   ```

4. **Verify services are healthy:**
   ```bash
   docker-compose -f docker/prod.dockercompose.yml ps
   ```

---

## Database Schema Management

Generate the Prisma client after any schema changes:
```bash
npx prisma generate --schema=packages/database/prisma/schema.prisma
```

Create a new migration:
```bash
npx prisma migrate dev --schema=packages/database/prisma/schema.prisma --name <migration-name>
```

---

## Monorepo Build (Turborepo)

Build all packages and apps:
```bash
npx turbo run build
```

Run all tests:
```bash
npx turbo run test
```

Run all linters:
```bash
npx turbo run lint
```

---

## Security Checklist

- [ ] All environment variables are set and not hardcoded in source files
- [ ] `JWT_SECRET` is at least 64 characters and cryptographically random
- [ ] PostgreSQL is not publicly accessible (only reachable within `internal-net`)
- [ ] CORS `ALLOWED_ORIGINS` is restricted to production domain(s)
- [ ] MFA is enabled for all privileged accounts (OWNER, ADMINISTRATOR, ACCOUNTING, PAYROLL)
- [ ] Rate limiting is active (100 req / 60s per IP)
- [ ] Audit logs are being written for all protected endpoint access
- [ ] TLS/HTTPS is terminated at the load balancer or reverse proxy

---

## Monitoring & Observability

- Application logs are written to stdout/stderr and captured by Docker's logging driver.
- Configure log forwarding to your observability platform (e.g., Datadog, CloudWatch, ELK Stack).
- Health check endpoints:
  - API Gateway: `GET /api/v1/health`
  - Database: Configured via Docker Compose `healthcheck`
