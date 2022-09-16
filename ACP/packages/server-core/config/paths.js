const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
// we're in ./config/
function getDotenvPath(ENV){
    return resolveApp("./.env")
}

module.exports = {
    getDotenvPath
}