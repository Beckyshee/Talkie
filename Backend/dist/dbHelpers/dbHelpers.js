"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../config/sqlConfig");
class dbHelper {
    static query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = mssql_1.default.connect(sqlConfig_1.sqlConfig);
            const results = (yield pool).request().query(query);
            return results;
        });
    }
    static execute(procedureName, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = mssql_1.default.connect(sqlConfig_1.sqlConfig);
            let request = (yield (yield pool).request());
            for (let key in data) {
                request.input(key, data[key]);
            }
            const result = yield request.execute(procedureName);
            return result;
        });
    }
}
exports.default = dbHelper;
