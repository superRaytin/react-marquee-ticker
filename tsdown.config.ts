import { defineConfig } from 'tsdown';

const common = {
  sourcemap: false,
  external: ['react', 'react-dom'],
}

export default defineConfig([
  {
    ...common,
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    outDir: './dist'
  },
  {
    ...common,
    entry: {
      'legacy/index': 'src/legacy/index.tsx',
    },
    target: 'es2015',
    format: ['cjs'],
    dts: true,
    clean: true,
    outExtensions: () => {
      return { js: '.js' }
    },
  },
]);