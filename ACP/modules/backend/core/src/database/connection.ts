import { getConnection, EntityTarget, Repository} from 'typeorm';

/**
 * gets repository of provided entity
 * @param connection_name name of the DB Connection
 * @param entity Entity name
 * @returns repository connection
 */
 export function getDBRepository<T>( connection_name: string ,entity : EntityTarget<T>){
    return getConnection(connection_name).getRepository<T>(entity)
}