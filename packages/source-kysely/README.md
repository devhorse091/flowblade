# @flowblade/source-kysely

## Install

```bash
yarn add @flowblade/source-kysely tedious tarn
```

## Utils

### createKyselyMssqlDialect

```typescript
import * as Tedious from 'tedious';
import { TediousConnUtils, createKyselyMssqlDialect } from '@flowblade/source-kysely';

const jdbcDsn = "sqlserver://localhost:1433;database=db;user=sa;password=pwd;trustServerCertificate=true;encrypt=false";
const tediousConfig = TediousConnUtils.fromJdbcDsn(jdbcDsn);
const tediousConnection = new Tedious.Connection(tediousConfig);

const dialect = createKyselyMssqlDialect(tediousConfig, {
  // Optional tarn pool options
  tarnPool: {
    min: 0,
    max: 10
  },
  // Optional tedious tyoes
  tediousTypes: {
    // Example based on https://github.com/kysely-org/kysely/issues/1161#issuecomment-2384539764
    { ...Tedious.TYPES, NVarChar: Tedious.TYPES.VarChar }
  }
});

const db = new Kysely<DB>({
  dialect
})
```

### TediousConnUtils

#### fromJdbcDsn

Parse and validate a JDBC connection string and return a Tedious connection configuration.

```typescript
import { TediousConnUtils } from '@flowblade/source-kysely';

const tediousConfig = TediousConnUtils.fromJdbcDsn(process.env.DB_JDBC_DSN);

const jdbcDsn = "sqlserver://localhost:1433;database=db;user=sa;password=pwd;trustServerCertificate=true;encrypt=false";
const tediousConfig = TediousConnUtils.fromJdbcDsn(jdbcDsn);
const tediousConnection = new Tedious.Connection(tediousConfig);
```

## Contributors

Contributions are welcome. Have a look to the [CONTRIBUTING](https://github.com/belgattitude/flowblade/blob/main/CONTRIBUTING.md) document.

## Sponsors

If my OSS work brightens your day, let's take it to new heights together!
[Sponsor](<[sponsorship](https://github.com/sponsors/belgattitude)>), [coffee](<(https://ko-fi.com/belgattitude)>),
or star – any gesture of support fuels my passion to improve. Thanks for being awesome! 🙏❤️

### Special thanks to

<table>
  <tr>
    <td>
      <a href="https://www.jetbrains.com/?ref=belgattitude" target="_blank">
         <img width="65" src="https://asset.brandfetch.io/idarKiKkI-/id53SttZhi.jpeg" alt="Jetbrains logo" />
      </a>
    </td>
    <td>
      <a href="https://www.embie.be/?ref=belgattitude" target="_blank">
        <img width="65" src="https://avatars.githubusercontent.com/u/98402122?s=200&v=4" alt="Jetbrains logo" />    
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://www.jetbrains.com/?ref=belgattitude" target="_blank">JetBrains</a>
    </td>
    <td align="center">
      <a href="https://www.embie.be/?ref=belgattitude" target="_blank">Embie.be</a>
    </td>
   </tr>
</table>

## License

MIT © [belgattitude](https://github.com/belgattitude) and contributors.
