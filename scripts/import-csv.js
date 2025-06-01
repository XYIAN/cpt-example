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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var csv_parse_1 = require("csv-parse");
var fs_1 = require("fs");
var path_1 = require("path");
var prisma_1 = require("../src/lib/prisma");
function cleanRequiredString(value) {
    if (!value)
        return '';
    var trimmed = value.trim();
    return trimmed === '' ? '' : trimmed;
}
function cleanOptionalString(value) {
    if (!value)
        return null;
    var trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
}
function cleanNumber(value) {
    if (!value)
        return null;
    var trimmed = value.trim();
    if (trimmed === '')
        return null;
    var num = parseFloat(trimmed);
    return isNaN(num) ? null : num;
}
function cleanDate(value) {
    if (!value)
        return null;
    var trimmed = value.trim();
    if (trimmed === '')
        return null;
    var date = new Date(trimmed);
    return isNaN(date.getTime()) ? null : date;
}
function importCsvFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var records, parser, _a, parser_1, parser_1_1, record, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    records = [];
                    parser = fs_1.default
                        .createReadStream(filePath)
                        .pipe((0, csv_parse_1.parse)({
                        columns: true,
                        skip_empty_lines: true,
                        trim: true
                    }));
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _a = true, parser_1 = __asyncValues(parser);
                    _e.label = 2;
                case 2: return [4 /*yield*/, parser_1.next()];
                case 3:
                    if (!(parser_1_1 = _e.sent(), _b = parser_1_1.done, !_b)) return [3 /*break*/, 5];
                    _d = parser_1_1.value;
                    _a = false;
                    record = _d;
                    records.push(record);
                    _e.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_a && !_b && (_c = parser_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(parser_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, records];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var members1, members2, members1Data, members2Data, allMembers, count, _i, allMembers_1, member, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, 9, 11]);
                    // Import data from both CSV files
                    console.log('Importing Members1.csv...');
                    return [4 /*yield*/, importCsvFile(path_1.default.join(__dirname, '../data/Members1.csv'))];
                case 1:
                    members1 = _a.sent();
                    console.log('Importing Members2.csv...');
                    return [4 /*yield*/, importCsvFile(path_1.default.join(__dirname, '../data/Members2.csv'))];
                case 2:
                    members2 = _a.sent();
                    members1Data = members1.map(function (record) { return ({
                        firstName: cleanRequiredString(record.FirstName),
                        lastName: cleanRequiredString(record.LastName),
                        email: cleanOptionalString(record.Email),
                        homePhone: cleanOptionalString(record.HomePhone),
                        mobilePhone: cleanOptionalString(record.MobilePhone),
                        address1: cleanOptionalString(record.Address1),
                        address2: cleanOptionalString(record.Address2),
                        city: cleanOptionalString(record.City),
                        state: cleanOptionalString(record.State),
                        zip: cleanOptionalString(record.Zip),
                        zip4: cleanOptionalString(record.Zip4),
                        productName: cleanOptionalString(record.ProductName),
                        datePurchased: cleanDate(record.DatePurchased),
                        paidAmount: cleanNumber(record.PaidAmount),
                        coveredWeeks: null,
                        lastStateWorked: null
                    }); });
                    members2Data = members2.map(function (record) { return ({
                        firstName: cleanRequiredString(record.FirstName),
                        lastName: cleanRequiredString(record.LastName),
                        email: cleanOptionalString(record.Email),
                        homePhone: cleanOptionalString(record.HomePhone),
                        mobilePhone: cleanOptionalString(record.MobilePhone),
                        address1: cleanOptionalString(record.Address1),
                        address2: cleanOptionalString(record.Address2),
                        city: cleanOptionalString(record.City),
                        state: cleanOptionalString(record.State),
                        zip: cleanOptionalString(record.Zip),
                        zip4: cleanOptionalString(record.Zip4),
                        productName: null,
                        datePurchased: null,
                        paidAmount: null,
                        coveredWeeks: cleanNumber(record.CoveredWeeks),
                        lastStateWorked: cleanOptionalString(record.LastStateWorked)
                    }); });
                    allMembers = __spreadArray(__spreadArray([], members1Data, true), members2Data, true);
                    // Clear existing data
                    console.log('Clearing existing data...');
                    return [4 /*yield*/, prisma_1.prisma.member.deleteMany()];
                case 3:
                    _a.sent();
                    // Insert all members
                    console.log('Inserting new members...');
                    count = 0;
                    _i = 0, allMembers_1 = allMembers;
                    _a.label = 4;
                case 4:
                    if (!(_i < allMembers_1.length)) return [3 /*break*/, 7];
                    member = allMembers_1[_i];
                    return [4 /*yield*/, prisma_1.prisma.member.create({
                            data: member
                        })];
                case 5:
                    _a.sent();
                    count++;
                    if (count % 100 === 0) {
                        console.log("Imported ".concat(count, " of ").concat(allMembers.length, " members..."));
                    }
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    console.log("\nSuccessfully imported ".concat(allMembers.length, " members"));
                    return [3 /*break*/, 11];
                case 8:
                    error_1 = _a.sent();
                    console.error('Error importing CSV data:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, prisma_1.prisma.$disconnect()];
                case 10:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
main();
