import * as fs from 'fs';
import { Logger, LoggerInterface } from '@Acp/backend-core-module';

const log: LoggerInterface = new Logger();

/**
 * generates new .env in app root folder, if variable exists it will overwrite else it will add as new variable
 * @param NODE_ENV Environment
 */
export function generate(NODE_ENV: string) {
    try {
        const root_env = fs.readFileSync(`../../../config/${NODE_ENV}.env`);
        var data = root_env.toString()
        if (fs.existsSync(`./config/${NODE_ENV}.env`)) {
            log.info(`app specific env exists, merging into root .env`)
            const app_env = fs.readFileSync(`./config/${NODE_ENV}.env`);
            const env_object = {} as any;
            app_env.toString().split(/\r?\n/).map((line: any) => {
                const splitted_text = line.split('=')
                if (splitted_text.length > 1) {
                    env_object[splitted_text[0]] = splitted_text[1]
                }
            })
            Object.keys(env_object).forEach((variable: string) => {
                let regex = new RegExp(variable + '.*', "g")
                if (!data.match(regex)) {
                    data = data + `${variable}=${env_object[`${variable}`]}`
                }
                else {
                    data = data.replace(regex, `${variable}=${env_object[`${variable}`]}`)
                }

            })
        }
        else {
            log.info(`app specific env not found, generating into root .env`)
        }
        fs.writeFileSync(`./.env`, data)

    }
    catch (error: any) {
        log.error(`Got an error while reading the file: ${error.message}`);
    }
}

const NODE_ENV = process.env.NODE_ENV;
generate(NODE_ENV)