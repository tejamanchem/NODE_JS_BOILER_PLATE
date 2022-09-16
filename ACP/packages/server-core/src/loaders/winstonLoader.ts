import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import {configure, format, transports  } from 'winston';
import { env } from '../env';
import 'winston-daily-rotate-file';


export const winstonLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    let transportsList = [];
    if(env.node == 'dev'){
        transportsList.push( new transports.Console({
            level: env.log.level,
            handleExceptions: true,
            format: env.node !== 'dev'
                ? format.combine(
                    format.json()
                )
                : format.combine(
                    format.colorize(),
                    format.simple()
                ),
        }))
    }else{
        transportsList.push(new transports.DailyRotateFile({
            filename: `${env.log.file}-%DATE%.log`,
            dirname: env.log.dir,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: env.log.isZip,
            format: format.json(),
            handleExceptions: true,
            maxSize: env.log.maxSize,
            maxFiles: env.log.maxFiles,
            level: 'info'
        }))
        transportsList.push(new transports.DailyRotateFile({
            filename: `${env.log.file}-error-%DATE%.log`,
            dirname: env.log.dir,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: env.log.isZip,
            format: format.json(),
            handleExceptions: true,
            maxSize: env.log.maxSize,
            maxFiles: env.log.maxFiles,
            level: 'error'
        }))
    }
    configure({
        transports:transportsList,
        exceptionHandlers : [
            new transports.File({filename : `${env.log.dir}/${env.log.file}.exceptions.log`})
        ],
        exitOnError : false,
        format: format.combine(
            format.timestamp(),
            format.json()
        )
    
    });
};
