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
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const prismaClient = new client_1.PrismaClient();
let locales = ['fr', 'de', 'it', 'ru', 'ja', 'ar', 'zh', 'ko', 'pt'];
function getReport(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const report = yield prismaClient.cmi_reports.findMany({
            where: {
                newsId: id,
            },
            select: {
                meta_title: true,
                meta_description: true,
                meta_keywords: true,
                competetivelandscape: true,
                recentdevelopment: true,
                marketoverview: true,
                majorplayerlist: true,
                scopeofreports: true,
                keymarkettrend: true,
                keyword: true,
                newsSubject: true,
                allcompany: true,
            },
        });
        return report[0];
    });
}
function translateReport() {
    return __awaiter(this, void 0, void 0, function* () {
        const report = yield getReport(1);
        const reportValues = Object.values(report);
        const data = {
            q: reportValues,
            source: 'en',
            target: 'de',
            format: 'html',
        };
        const res = yield axios_1.default.post('http://35.90.100.70/translate', data);
        const translatedText = res.data.translatedText;
        console.log(translatedText);
        return translatedText;
    });
}
translateReport();
// try {
//   const translatedReport = await translateReport(reportValues, 'de');
//   console.log(translatedReport);
// } catch (err) {
//   console.log(err);
// }
