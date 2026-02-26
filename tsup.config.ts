import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  // Externalize JSON data files - they won't be bundled
  external: [
    './data/divisions.json',
    './data/districts.json',
    './data/upazilas.json',
    '../data/divisions.json',
    '../data/districts.json',
    '../data/upazilas.json',
  ],
  // Disable JSON loader
  loader: {
    '.json': 'copy',
  },
});