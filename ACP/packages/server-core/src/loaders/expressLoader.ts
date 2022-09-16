import { Application } from "express";
import {
    MicroframeworkLoader,
    MicroframeworkSettings,
} from "microframework-w3tec";
import { createExpressServer } from "routing-controllers";
import passport from "passport";
import { Action } from "routing-controllers";
import { env } from "../env";
export const expressLoader: MicroframeworkLoader = (
    settings: MicroframeworkSettings | undefined
) => {
    if (settings) {
        // const connection = settings.getData('connection');

        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */

        const expressApp: Application = createExpressServer({
            cors: true,
            classTransformer: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: env.app.dirs.controllers,
            middlewares: env.app.dirs.middlewares,
            interceptors: env.app.dirs.interceptors,

            /**
             * Authorization features
             */
            authorizationChecker: async (
                action: Action,
                roles: Array<number>
            ) =>
                new Promise<boolean>((resolve) => {
                    console.log(
                        "Roles associated with this controller are",
                        roles
                    );
                    passport.authenticate("oauth-bearer", (err, user, jwtToken) => {
                        // let user_roles = jwtToken.userGroups;
                        // let res = getRoles(roles);
                        // if (err) resolve(false);
                        // else if (!user) resolve(false);
                        // if (user_roles.includes(res.globalAdmin))
                        //     resolve(true);
                        // else if (
                        //     user_roles.some((group: String) => {
                        //         return res.groupPermissions.indexOf(group) > -1;
                        //     })
                        // )
                        //     resolve(true);
                        // resolve(false);
                    })(action.request, action.response);
                }),

            currentUserChecker: (action: Action) => action.request.user,
        });

        // Run application to listen on given port
        if (!env.isTest) {
            const server = expressApp.listen(env.app.port);
            settings.setData("express_server", server);
        }

        // Here we can set the data for other loaders
        settings.setData("express_app", expressApp);
    }
};
