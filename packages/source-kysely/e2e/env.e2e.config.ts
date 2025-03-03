const sqlServerDsn =
  'sqlserver://localhost:11433;database=master;user=sa;password=FlowbladeSADev123;trustServerCertificate=true;encrypt=false';

export const envE2EConfig = {
  sqlServer: {
    dsn: sqlServerDsn,
    prisma: {
      schema: 'e2e/mssql/db/schema-sql-server.e2e.prisma',
      env: {
        E2E_DB_AZURE_SQL_EDGE: sqlServerDsn,
      },
    },
  },
} as const;
