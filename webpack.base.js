import { AngularWebpackPlugin } from "@ngtools/webpack";
import linkerPlugin from "@angular/compiler-cli/linker/babel";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";

export default function (env = {}) {
  const htmlLoaderOptions = {
    minimize: false,
  };

  return {
    entry: {
      main: "./src/main.ts",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(import.meta.dirname, "src/index.html"),
      }),
      new AngularWebpackPlugin({
        tsconfig: "./tsconfig.json",
        compilerOptions: {},
      }),
    ],
    module: {
      rules: [
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: "@ngtools/webpack",
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader",
            options: {
              ...htmlLoaderOptions,
            },
          },
        },
        {
          test: /\.m?js$/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: [linkerPlugin],
              compact: false,
              cacheDirectory: true,
            },
          },
        },
      ],
    },
  };
}
