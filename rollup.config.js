import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const pkg = require("./package.json");

export default [
  {
    input: "src/index.ts",
    external: ["react", "react-dom"],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
    ],
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      { file: "dist/index.mjs", format: "esm", sourcemap: true },
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
