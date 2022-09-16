import { MicroframeworkLoader, MicroframeworkSettings } from "microframework-w3tec";
import { createConnections, getConnection } from "typeorm";
import { dbConfigConnections } from '../loader-cli/database.config'

export const typeormLoader: MicroframeworkLoader = async (
    settings: MicroframeworkSettings | undefined
) => {

    let configurations:any = dbConfigConnections
    const connections = await createConnections(configurations)

    if (settings) {
        settings.setData("connection", connections);
        await getConnection("default").runMigrations();
        settings.onShutdown(() => {
            getConnection("default").close();
        });
    }
};
