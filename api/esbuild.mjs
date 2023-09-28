"use strict";

import esbuild from "esbuild";
// import { readdirSync } from "fs";

class ESBuild {
  constructor() {
    this.config = {
      bundle: false,
      sourcemap: true,
      platform: "node",
      target: ["node18"],
      format: "cjs",
      legalComments: "none",
      minify: false,
      treeShaking: true,
      tsconfig: "tsconfig.json",
      // define: {
      //   "process.env.SERVICE_STUBS_PORT": JSON.stringify(process.env.SERVICE_STUBS_PORT ?? "")
      // }
    };

    this.esbuild = esbuild;
  }

  // getHandlers() {
  //   const files = readdirSync(this.handlersDir);
  //   const handlerFiles = [];

  //   files.forEach(function (filename) {
  //     // Each file in the _lambda-handlers directory is an "entry" point
  //     // Except for the .spec files
  //     if (!filename.match(/\.spec\.[jt]s/i)) {
  //       const handlerName = filename.split(".")[0];
  //       handlerFiles.push({
  //         filePath: `${this.handlersDir}/${filename}`,
  //         handlerName: handlerName,
  //         outFile: `./dist/${handlerName}/handler.js`,
  //       });
  //     }
  //   }, this);

  //   return handlerFiles;
  // }

  build() {
    // const handlers = this.getHandlers();

    this.esbuild
      .build({
        ...this.config,
        // entryPoints: handlers.map((handler) => handler.filePath),
        entryPoints: ["./src/**/*"],
        outdir: "lib",
      })
      .then(() => {
        this.config.watch ? console.log("Watching...") : console.log("Bundling complete");
      });
  }
}

const bundler = new ESBuild();
bundler.build();
