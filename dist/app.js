var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import pLimit from 'p-limit';
const prismaClient = new PrismaClient();
let locales = ['fr', 'de', 'it', 'ru', 'ja', 'ar', 'zh', 'ko', 'pt'];
//Fetch the report From the database
function getReport(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const report = yield prismaClient.cmi_reports.findUnique({
                where: {
                    newsId: id,
                },
                select: {
                    meta_title: true,
                    meta_description: true,
                    meta_keywords: true,
                    keyword: true,
                    newsSubject: true,
                    competetivelandscape: true,
                    recentdevelopment: true,
                    marketoverview: true,
                    majorplayerlist: true,
                    scopeofreports: true,
                    keymarkettrend: true,
                    allcompany: true,
                },
            });
            return report;
        }
        catch (err) {
            console.log('Unable to fetch the Report!');
        }
    });
}
//Translate the Single Report
function translateReport(reportId, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        //fetch the report from Database
        const report = yield getReport(reportId);
        if (report) {
            const reportValues = Object.values(report);
            const data = {
                q: reportValues,
                source: 'en',
                target: lang,
                format: 'html',
            };
            try {
                //Send the report text for the translation and await on request
                const res = yield axios.post('http://52.89.187.86/translate', data);
                //Taking the translatedText array from the response
                const translatedReport = res.data.translatedText;
                console.log('Successfully Translated Report with ID ' + reportId + ' to ', lang);
                //Save the translated Text to the specific language table
                try {
                    switch (lang) {
                        case 'fr':
                            yield prismaClient.cmi_reports_fr.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'de':
                            yield prismaClient.cmi_reports_de.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'it':
                            yield prismaClient.cmi_reports_it.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'ru':
                            yield prismaClient.cmi_reports_ru.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'ja':
                            yield prismaClient.cmi_reports_ja.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'ar':
                            yield prismaClient.cmi_reports_ar.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'zh':
                            yield prismaClient.cmi_reports_zh.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'ko':
                            yield prismaClient.cmi_reports_ko.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'pt':
                            yield prismaClient.cmi_reports_pt.create({
                                data: {
                                    reportid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    keywords: translatedReport[3],
                                    newsLDesc: translatedReport[4],
                                    competetivelandscape: translatedReport[5],
                                    recentdevelopment: translatedReport[6],
                                    marketoverview: translatedReport[7],
                                    majorplayerlist: translatedReport[8],
                                    scopeofreports: translatedReport[9],
                                    keymarkettrend: translatedReport[10],
                                    allcompany: translatedReport[11],
                                },
                            });
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        default:
                            console.log('No Locale was matched!');
                            break;
                    }
                }
                catch (err) {
                    console.log('Got error while saving the translated report to database!');
                }
            }
            catch (err) {
                console.log('Unable to Translate the Report ' + reportId + ' to ' + lang);
            }
        }
        else {
            console.log('There is Not Report received to translate!');
            return null;
        }
    });
}
function translate() {
    return __awaiter(this, void 0, void 0, function* () {
        //Create the Request Limit
        const limit = pLimit(10);
        const reportIds = yield prismaClient.cmi_reports.findMany({
            where: {
                newsId: {
                    gt: 10,
                },
            },
            select: {
                newsId: true,
            },
        });
        const promises = reportIds.map((id) => limit(() => translateReport(id.newsId, 'zh')));
        yield Promise.all(promises);
        console.log('All Reports are Translated !');
        // for (const id of reportIds) {
        //   await translateReport(id.newsId, 'de');
        // }
    });
}
translate();
