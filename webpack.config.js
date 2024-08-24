import path from "node:path";
import { merge } from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import base from "./webpack.base.js";

const cssLoaders = ["style-loader", "css-loader"];

export default function (env = {}) {
  const buildFolder = "./build";

  return merge(base(env), {
    watchOptions: {
      ignored: /node_modules/,
    },
    mode: "development",
    output: {
      path: path.resolve(import.meta.dirname, buildFolder),
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [...cssLoaders, "less-loader"],
        },
        {
          test: /\.css$/,
          use: [...cssLoaders],
        },
      ],
    },
  });
}
