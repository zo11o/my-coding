"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("../../utils"));
console.log(utils_1.default);
function convertBST() {
}
var t = '1,2,3,#,#,4,5,#,#';
var tree = utils_1.default.deserializeByString(t);
console.log(tree);
