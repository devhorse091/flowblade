import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    cjsInterop: false,
    clean: true,
    dts: true,
    entry: ['src/index.ts', 'src/kysely.ts'],
    format: ['esm', 'cjs'],
    minify: !options.watch,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    outExtension({ format }) {
      return {
        js: `.${format === 'cjs' ? 'cjs' : 'mjs'}`,
      };
    },
    platform: 'browser',
    sourcemap: !options.watch,
    splitting: true,
    target: ['es2022', ...browserslistToEsbuild()],
    treeshake: true,
    tsconfig: './tsconfig.build.json',
  };
});
