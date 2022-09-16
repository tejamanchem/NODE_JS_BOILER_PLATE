# NODE_JS_BOILER_PLATE

## NodeJs boiler plate refers to individual nodejs servers

### Step-1
clone the Repositry

### step-2
cd ACP 
for setuping your project

### step-3 
Run yarn command in your terminal

when yarn command is run there are node_modules found in your local they are modules installed for your project
##### Alert Dont push node_modules to repo

### step-4
To start the server type 'yarn workspace @Acp/server-core start serve' in teriminal

##### Looks like the server will start after executing this command


##### Now You can add what ever you need in your project 

##### Frequently used commands
Build-Modules : yarn build-modules
Watch-modules : yarn watch-modules
to clean dist folders  : yarn clean

##### ADD Database Models
Write Database models in models folder ->Acp/modules/backend/models
After writing a model you need to generate a migration file to generate tables in Db for that you need to type a command in terminal
Generating Migration File : yarn workspace @Acp/server-core start db.generate '<nameOfGenatatingFile>'
After generating the migration file the file is in -> Acp/packages/server-core/src/database/ACP/migrations
-->yarn workspace @Acp/server-core start build.dev
To build dist file in server-core
To Migrate migration Files : 'yarn workspace @Acp/server-core start db.migrate'
migrations are successfully done for your database


##### ADD SEEDS
write seeds in models itself create a folder seeds in model and add seed files
TO run Seed : yarn workspace @Acp/server-core start db.seed


 




