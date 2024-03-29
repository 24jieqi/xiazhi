"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfig = exports.getMergedConfig = exports.readConfigFile = exports.generateConfigFile = exports.update = exports.start = exports.sync = void 0;
var sync_1 = require("./commands/sync");
Object.defineProperty(exports, "sync", { enumerable: true, get: function () { return sync_1.sync; } });
var generate_1 = require("./commands/generate");
Object.defineProperty(exports, "start", { enumerable: true, get: function () { return generate_1.start; } });
var update_1 = require("./commands/update");
Object.defineProperty(exports, "update", { enumerable: true, get: function () { return update_1.update; } });
var config_1 = require("./commands/config");
Object.defineProperty(exports, "generateConfigFile", { enumerable: true, get: function () { return config_1.generateConfigFile; } });
Object.defineProperty(exports, "readConfigFile", { enumerable: true, get: function () { return config_1.readConfigFile; } });
Object.defineProperty(exports, "getMergedConfig", { enumerable: true, get: function () { return config_1.getMergedConfig; } });
Object.defineProperty(exports, "checkConfig", { enumerable: true, get: function () { return config_1.checkConfig; } });
//# sourceMappingURL=index.js.map