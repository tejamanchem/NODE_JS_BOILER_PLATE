/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, rimraf } = require("nps-utils");
const typeOrm = require.resolve("typeorm/cli");
const typeOrmSeed = require.resolve("typeorm-seeding/dist/cli")
const Processarry = process.argv;
let ProcessArgInputLastInp;
let userInput;
let migrationFileName;
if (Processarry.includes('db.generate') ) {
    ProcessArgInputLastInp = Processarry[Processarry.length - 1];
    if (ProcessArgInputLastInp != 'db.generate' ) {
        userInput = ProcessArgInputLastInp;
    } else {
        throw new Error('Please provide name for genearating migration like "db.generate <migrationname>"')
    }
}

if ( Processarry.includes('db.create')) {
    ProcessArgInputLastInp = Processarry[Processarry.length - 1];
    if (ProcessArgInputLastInp != 'db.create') {
        migrationFileName = ProcessArgInputLastInp;
    } else {
        throw new Error('Please provide name for genearating migration like "db.generate <migrationname>"')
    }
}

module.exports = {
    scripts: {
        default: "nps start",
        /**
         * Starts the builded app from the dist directory.
         */
        app: {
            prod: {
                script: `cross-env NODE_ENV=prod node dist/app.js`,
                description: "Starts the builded app",
            },
            stg: {
                script: `cross-env NODE_ENV=stg node dist/app.js`,
                description: "Starts the builded app",
            },
            test: {
                script: `cross-env NODE_ENV=stg node dist/app.js`,
                description: "Starts the builded app",
            }

        },
        /**
         * Serves the current app and watches for changes to restart it
         */
        serve: {
            inspector: {
                script: series(
                    "nps banner.serve",
                    "nodemon --watch src --watch .env --inspect"
                ),
                description:
                    "Serves the current app and watches for changes to restart it, you may attach inspector to it.",
            },
            script: series(
                "nps banner.serve",
                "cross-env NODE_ENV=dev nodemon --watch src --watch .env"
            ),
            description:
                "Serves the current app and watches for changes to restart it",
        },

        /**
         * Setup of the development environment
         */

        setup: {
            script: series("yarn install", "nps db.setup"),
            description: "Setup`s the dev environment(yarn & database)",
        },
        /**
         * Creates the needed configuration files
         */
        config: {
            script: series(runFast("./commands/tsconfig.ts")),
            hiddenFromHelp: true,
        },
        /**
         * generates new .env file in the app root folder
         */
        generate_env : {
            dev : {
                script : `cross-env NODE_ENV=dev ts-node generate-env.ts`
            },
            prod : {
                script : `cross-env NODE_ENV=prod ts-node generate-env.ts`
            },
            stg : {
                script : `cross-env NODE_ENV=stg ts-node generate-env.ts`
            },
            test : {
                script : `cross-env NODE_ENV=test ts-node generate-env.ts`
            }
            
        },
        /**
         * Builds the app into the dist directory
         */
        build: {
            prod: {
                script: series(
                    "nps generate_env.prod",
                    "nps banner.build",
                    "nps config",
                    // 'nps lint',
                    "nps clean.dist",
                    "nps transpile",
                    "nps copy",
                    "nps copy.tmp",
                    "nps clean.tmp"
                ),
                description: "Builds the app into the dist directory",
            },
            stg: {
                script: series(
                    "nps generate_env.stg",
                    "nps banner.build",
                    "nps config",
                    // 'nps lint',
                    "nps clean.dist",
                    "nps transpile",
                    "nps copy",
                    "nps copy.tmp",
                    "nps clean.tmp"
                )
            },
            dev: {
                script: series(
                    "nps generate_env.dev",
                    "nps banner.build",
                    "nps config",
                    // 'nps lint',
                    "nps clean.dist",
                    "nps transpile",
                    "nps copy",
                    "nps copy.tmp",
                    "nps clean.tmp"
                )
            },
            test: {
                script: series(
                    "nps generate_env.test",
                    "nps banner.build",
                    "nps config",
                    // 'nps lint',
                    "nps clean.dist",
                    "nps transpile",
                    "nps copy",
                    "nps copy.tmp",
                    "nps clean.tmp"
                ),
                description: "Builds the app into the dist directory",
            }
        },
        /**
         * Runs TSLint over your project
         */
        lint: {
            script: tslint(`./src/**/*.ts`),
            hiddenFromHelp: true,
        },
        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `tsc --project ./tsconfig.build.json`,
            hiddenFromHelp: true,
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(`nps banner.clean`, `nps clean.dist`),
                description: "Deletes the ./dist folder",
            },
            dist: {
                script: rimraf("./dist"),
                hiddenFromHelp: true,
            },
            tmp: {
                script: rimraf("./.tmp"),
                hiddenFromHelp: true,
            },
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            default: {
                script: series(`nps copy.public`),
                hiddenFromHelp: true,
            },
            public: {
                script: copy("./src/public/*", "./dist"),
                hiddenFromHelp: true,
            },
            tmp: {
                script: copyDir("./.tmp/src", "./dist"),
                hiddenFromHelp: true,
            },
        },
        /**
         * Database scripts
         */
        db: {
            
                generate:{
                    script: series(
                            "nps banner.generate",
                            "nps config",
                            runFast(
                                `${typeOrm} migration:generate -f src/loader-cli/loader.ts -n ${userInput} -c default`
                            )
                        ),
                    description:
                        "Generate the migration with new changes",
                },
                seed: {
                    script: series(
                        "nps banner.seed",
                        "nps config",
                        runFast(`${typeOrmSeed} seed -n dist/loader-cli/loader.js -c default`)
                    ),
                    description: "Seeds generated records into the database",
                },
                drop:{
                    script: runFast(
                        `${typeOrm} schema:drop -f src/loader-cli/loader.ts -c default`
                    ),
                    description: "Drops the schema of the database",
                },
            migrate: {
                script: series(
                    "nps banner.migrate",
                    "nps config",
                    runFast(
                        `${typeOrm} migration:run -f src/loader-cli/loader.ts -c default`
                    ),
                    "echo migrations done for ACP database",
                    // runFast(
                    //     `${typeOrm} migration:run -f src/loader-cli/loader.ts -c customer`
                    // ),
                    // "echo migrations done for customer database",
                ),
                description:
                    "Migrates the database to newest version available",
            },
            revert: {
                script: series(
                    "nps banner.revert",
                    "nps config",
                    runFast(
                        `${typeOrm} migration:revert -f src/loader-cli/loader.ts -c default`
                    ),

                    runFast(
                        `${typeOrm} migration:revert -f src/loader-cli/loader.ts -c customer`
                    )
                ),
                description: "Downgrades the database",
            },
            setup: {
                script: series(
                    "nps db.drop",
                    "nps db.migrate",
                    "nps db.seed"
                ),
                description: "Recreates the database with seeded data",
            },
            create: {
                script: series(
                    "nps config",
                    runFast(
                        `${typeOrm} migration:create -n ${migrationFileName}`
                    ),
                ),
                description:
                    "Creates the migration file to migrates to the database",
            }
        },
        /**
         * These run various kinds of tests. Default is unit.
         */
        test: {
            default: "nps test.unit",
            unit: {
                default: {
                    script: series(
                        "nps banner.testUnit",
                        //"nps test.unit.pretest",
                        "nps test.unit.run"
                    ),
                    description: "Runs the unit tests",
                },
                pretest: {
                    script: tslint(`./test/unit/**.ts`),
                    hiddenFromHelp: true,
                },
                run: {
                    script:
                        "cross-env NODE_ENV=test jest --testPathPattern=unit  --runInBand",
                    hiddenFromHelp: true,
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true,
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true,
                },
            },
            integration: {
                default: {
                    script: series(
                        "nps banner.testIntegration",
                        "nps test.integration.pretest",
                        "nps test.integration.run"
                    ),
                    description: "Runs the integration tests",
                },
                pretest: {
                    script: tslint(`./test/integration/**.ts`),
                    hiddenFromHelp: true,
                },
                run: {
                    // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                    script:
                        "cross-env NODE_ENV=test jest --testPathPattern=integration -i",
                    hiddenFromHelp: true,
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true,
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true,
                },
            },
            e2e: {
                default: {
                    script: series(
                        "nps banner.testE2E",
                        "nps test.e2e.pretest",
                        "nps test.e2e.run"
                    ),
                    description: "Runs the e2e tests",
                },
                pretest: {
                    script: tslint(`./test/e2e/**.ts`),
                    hiddenFromHelp: true,
                },
                run: {
                    // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                    script:
                        "cross-env NODE_ENV=test jest --testPathPattern=e2e -i",
                    hiddenFromHelp: true,
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true,
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true,
                },
            },
        },
        /**
         * This creates pretty banner to the terminal
         */
        banner: {
            build: banner("build"),
            serve: banner("serve"),
            testUnit: banner("test.unit"),
            testIntegration: banner("test.integration"),
            testE2E: banner("test.e2e"),
            migrate: banner("migrate"),
            seed: banner("seed"),
            revert: banner("revert"),
            clean: banner("clean"),
            generate: banner("generate")
        },
    },
};

function banner(name) {
    return {
        hiddenFromHelp: true,
        silent: true,
        description: `Shows ${name} banners to the console`,
        script: runFast(`./commands/banner.ts ${name}`),
    };
}

function copy(source, target) {
    return `copyfiles --up 1 ${source} ${target}`;
}

function copyDir(source, target) {
    return `ncp ${source} ${target}`;
}

function run(path) {
    return `ts-node ${path}`;
}

function runFast(path) {
    return `ts-node --transpileOnly ${path}`;
}

function tslint(path) {
    return `tslint -c ./tslint.json ${path} --format stylish`;
}
