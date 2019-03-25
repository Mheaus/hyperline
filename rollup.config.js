import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  name: 'hyperline',
  input: 'src/index.js',
  output: {
    file: 'dist/hyperline.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'Component',
          'createElement',
          'forwardRef',
          'Fragment',
        ],
      },
    }),
    json(),
  ],
  external: [
    'child_process',
    'hyper/decorate',
    'hyper/component',
    'util',
    'events',
    'url',
    'querystring',
    'dgram',
    'fs',
    'https',
    'http',
    'buffer',
    'net',
    'stream',
    'electron',
    'punycode',
    'zlib',
  ],
};
