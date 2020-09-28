"use strict";

const path = require("path");
const pkg = require("./package.json");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(pkg.main),
    },
    plugins: [
        new CleanWebpackPlugin({
            dry: false,
            cleanOnceBeforeBuildPatterns: [
                "!oslllo-validator-exception.js",
                "!oslllo-validator-exception.min.js",
            ],
        }),
    ],
    output: {
        library: "assert",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist"),
    },
};
