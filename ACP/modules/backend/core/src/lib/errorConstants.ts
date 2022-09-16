import { QueryFailedError } from 'typeorm';

export const errorConstants = {
    notFound: {
        status: 404,
        message: 'requested ${resource} does not exist',
    }
}

export const isQueryFailedError = (err: any): err is QueryFailedError => {
    return err instanceof QueryFailedError;

} 