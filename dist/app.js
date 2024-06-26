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
import winston from 'winston';
//Winston Logger to store the all logs to the seperate files.
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston.format.printf((info) => {
        let logMsg = `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
        if (info.durationMs) {
            logMsg += ` (Duration: ${info.durationMs} ms)`;
        }
        return logMsg;
    })),
    transports: [
        new winston.transports.File({
            filename: 'logs/running.log',
            level: 'info',
            options: { flags: 'w' },
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            options: { flags: 'w' },
        }),
    ],
});
const prismaClient = new PrismaClient();
let locales = ['fr', 'de', 'it', 'ru', 'pt', 'zh', 'ko', 'ja'];
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
                    newsSubject: true,
                    keyword: true,
                    summary: true,
                },
            });
            if ((report === null || report === void 0 ? void 0 : report.summary) === '' || (report === null || report === void 0 ? void 0 : report.summary) === null) {
                return null;
            }
            return report;
        }
        catch (err) {
            logger.log({
                level: 'error',
                message: 'Unable to fetch the Report!' + err,
            });
        }
    });
}
//Retry Saving report to the database
function Retry(reportId, translatedReport, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        // Save the translated Text to the specific language table
        try {
            switch (lang) {
                case 'fr':
                    yield prismaClient.cmi_RegionalFrench.create({
                        data: {
                            rid: reportId,
                            meta_title: translatedReport[0],
                            meta_description: translatedReport[1],
                            meta_keywords: translatedReport[2],
                            newsSubject: translatedReport[3],
                            keyword: translatedReport[4],
                            Summary: translatedReport[5],
                            TransDate: today,
                        },
                    });
                    logger.log({
                        level: 'info',
                        message: 'Translated Report ' +
                            reportId +
                            ' Saved Successfully to ' +
                            lang +
                            ' table!',
                    });
                    break;
                case 'de':
                    yield prismaClient.cmi_RegionalGerman.create({
                        data: {
                            rid: reportId,
                            meta_title: translatedReport[0],
                            meta_description: translatedReport[1],
                            meta_keywords: translatedReport[2],
                            newsSubject: translatedReport[3],
                            keyword: translatedReport[4],
                            Summary: translatedReport[5],
                            TransDate: today,
                        },
                    });
                    logger.log({
                        level: 'info',
                        message: 'Translated Report ' +
                            reportId +
                            ' Saved Successfully to ' +
                            lang +
                            ' table!',
                    });
                    break;
                case 'it':
                    yield prismaClient.cmi_RegionalItalian.create({
                        data: {
                            rid: reportId,
                            meta_title: translatedReport[0],
                            meta_description: translatedReport[1],
                            meta_keywords: translatedReport[2],
                            newsSubject: translatedReport[3],
                            keyword: translatedReport[4],
                            Summary: translatedReport[5],
                            TransDate: today,
                        },
                    });
                    logger.log({
                        level: 'info',
                        message: 'Translated Report ' +
                            reportId +
                            ' Saved Successfully to ' +
                            lang +
                            ' table!',
                    });
                    break;
                case 'ru':
                    yield prismaClient.cmi_RegionalRussian.create({
                        data: {
                            rid: reportId,
                            meta_title: translatedReport[0],
                            meta_description: translatedReport[1],
                            meta_keywords: translatedReport[2],
                            newsSubject: translatedReport[3],
                            keyword: translatedReport[4],
                            Summary: translatedReport[5],
                            TransDate: today,
                        },
                    });
                    logger.log({
                        level: 'info',
                        message: 'Translated Report ' +
                            reportId +
                            ' Saved Successfully to ' +
                            lang +
                            ' table!',
                    });
                    break;
                case 'ja':
                    yield prismaClient.cmi_RegionalJapanese.create({
                        data: {
                            rid: reportId,
                            meta_title: translatedReport[0],
                            meta_description: translatedReport[1],
                            meta_keywords: translatedReport[2],
                            newsSubject: translatedReport[3],
                            keyword: translatedReport[4],
                            Summary: translatedReport[5],
                            TransDate: today,
                        },
                    });
                    logger.log({
                        level: 'info',
                        message: 'Translated Report ' +
                            reportId +
                            ' Saved Successfully to ' +
                            lang +
                            ' table!',
                    });
                    break;
                case 'zh':
                    yield prismaClient.cmi_RegionalChinese.create({
                        data: {
                            rid: reportId,
                            meta_title: translatedReport[0],
                            meta_description: translatedReport[1],
                            meta_keywords: translatedReport[2],
                            newsSubject: translatedReport[3],
                            keyword: translatedReport[4],
                            Summary: translatedReport[5],
                            TransDate: today,
                        },
                    });
                    logger.log({
                        level: 'info',
                        message: 'Translated Report ' +
                            reportId +
                            ' Saved Successfully to ' +
                            lang +
                            ' table!',
                    });
                    break;
                case 'ko':
                    yield prismaClient.cmi_RegionalKorean.create({
                        data: {
                            rid: reportId,
                            meta_title: translatedReport[0],
                            meta_description: translatedReport[1],
                            meta_keywords: translatedReport[2],
                            newsSubject: translatedReport[3],
                            keyword: translatedReport[4],
                            Summary: translatedReport[5],
                            TransDate: today,
                        },
                    });
                    logger.log({
                        level: 'info',
                        message: 'Translated Report ' +
                            reportId +
                            ' Saved Successfully to ' +
                            lang +
                            ' table!',
                    });
                    break;
                case 'pt':
                    yield prismaClient.cmi_RegionalPortuguese.create({
                        data: {
                            rid: reportId,
                            meta_title: translatedReport[0],
                            meta_description: translatedReport[1],
                            meta_keywords: translatedReport[2],
                            newsSubject: translatedReport[3],
                            keyword: translatedReport[4],
                            Summary: translatedReport[5],
                            TransDate: today,
                        },
                    });
                    logger.log({
                        level: 'info',
                        message: 'Translated Report ' +
                            reportId +
                            ' Saved Successfully to ' +
                            lang +
                            ' table!',
                    });
                    break;
                default:
                    console.log('No Locale was matched!');
                    break;
            }
        }
        catch (err) {
            logger.log({
                level: 'error',
                message: 'Got error while Retrying to save the translated report to database :->' +
                    err,
            });
        }
    });
}
let RetryCount = 1;
let saveRetry = 1;
// Translate the Single Report
function translateReport(reportId, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        //Precheck if the report is already translated
        const isPresent = yield isReportTraslated(reportId, lang);
        if (isPresent) {
            console.log('Report with ID ' + reportId + ' is already translated!');
            return;
        }
        //fetch the report from Database
        const report = yield getReport(reportId);
        if (report) {
            const reportValues = [
                report.meta_title,
                report.meta_description,
                report.meta_keywords,
                report.newsSubject,
                report.keyword,
                report.summary,
            ];
            //Request Body
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
                logger.log({
                    level: 'info',
                    message: 'Successfully Translated Report with ID ' + reportId + ' to ' + lang,
                });
                const today = new Date();
                // Save the translated Text to the respective language table
                try {
                    switch (lang) {
                        case 'fr':
                            yield prismaClient.cmi_RegionalFrench.create({
                                data: {
                                    rid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    newsSubject: translatedReport[3],
                                    keyword: translatedReport[4],
                                    Summary: translatedReport[5],
                                    TransDate: today,
                                },
                            });
                            logger.log({
                                level: 'info',
                                message: 'Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!',
                            });
                            break;
                        case 'de':
                            yield prismaClient.cmi_RegionalGerman.create({
                                data: {
                                    rid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    newsSubject: translatedReport[3],
                                    keyword: translatedReport[4],
                                    Summary: translatedReport[5],
                                    TransDate: today,
                                },
                            });
                            logger.log({
                                level: 'info',
                                message: 'Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!',
                            });
                            break;
                        case 'it':
                            yield prismaClient.cmi_RegionalItalian.create({
                                data: {
                                    rid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    newsSubject: translatedReport[3],
                                    keyword: translatedReport[4],
                                    Summary: translatedReport[5],
                                    TransDate: today,
                                },
                            });
                            logger.log({
                                level: 'info',
                                message: 'Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!',
                            });
                            break;
                        case 'ru':
                            yield prismaClient.cmi_RegionalRussian.create({
                                data: {
                                    rid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    newsSubject: translatedReport[3],
                                    keyword: translatedReport[4],
                                    Summary: translatedReport[5],
                                    TransDate: today,
                                },
                            });
                            logger.log({
                                level: 'info',
                                message: 'Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!',
                            });
                            break;
                        case 'ja':
                            yield prismaClient.cmi_RegionalJapanese.create({
                                data: {
                                    rid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    newsSubject: translatedReport[3],
                                    keyword: translatedReport[4],
                                    Summary: translatedReport[5],
                                    TransDate: today,
                                },
                            });
                            logger.log({
                                level: 'info',
                                message: 'Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!',
                            });
                            break;
                        case 'zh':
                            yield prismaClient.cmi_RegionalChinese.create({
                                data: {
                                    rid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    newsSubject: translatedReport[3],
                                    keyword: translatedReport[4],
                                    Summary: translatedReport[5],
                                    TransDate: today,
                                },
                            });
                            logger.log({
                                level: 'info',
                                message: 'Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!',
                            });
                            break;
                        case 'ko':
                            yield prismaClient.cmi_RegionalKorean.create({
                                data: {
                                    rid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    newsSubject: translatedReport[3],
                                    keyword: translatedReport[4],
                                    Summary: translatedReport[5],
                                    TransDate: today,
                                },
                            });
                            logger.log({
                                level: 'info',
                                message: 'Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!',
                            });
                            break;
                        case 'pt':
                            yield prismaClient.cmi_RegionalPortuguese.create({
                                data: {
                                    rid: reportId,
                                    meta_title: translatedReport[0],
                                    meta_description: translatedReport[1],
                                    meta_keywords: translatedReport[2],
                                    newsSubject: translatedReport[3],
                                    keyword: translatedReport[4],
                                    Summary: translatedReport[5],
                                    TransDate: today,
                                },
                            });
                            logger.log({
                                level: 'info',
                                message: 'Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!',
                            });
                            break;
                        default:
                            logger.log({ level: 'info', message: 'No Locale was matched!' });
                            break;
                    }
                }
                catch (err) {
                    logger.log({
                        level: 'error',
                        message: 'Got error while saving the translated report to database!' + err,
                    });
                    logger.log({ level: 'info', message: 'Retrying...!' });
                    if (saveRetry <= 3) {
                        saveRetry += 1;
                        //Retry saving the record to the database
                        yield Retry(reportId, translatedReport, lang);
                    }
                    else {
                        saveRetry = 0;
                        return;
                    }
                }
            }
            catch (err) {
                logger.log({
                    level: 'error',
                    message: 'Unable to Translate the Report ' +
                        reportId +
                        ' to ' +
                        lang +
                        ' error is :-> ' +
                        err,
                });
                logger.log({ level: 'info', message: 'Retrying...!' });
                if (RetryCount <= 3) {
                    //If translating server got the error while translating recalling the function recursively
                    RetryCount += 1;
                    yield translateReport(reportId, lang);
                }
                else {
                    RetryCount = 0;
                    logger.log({
                        level: 'info',
                        message: 'Retry limit is Over! Failed to translating the Report Id : ' +
                            reportId,
                    });
                    return false;
                }
            }
        }
        else {
            logger.log({
                level: 'info',
                message: 'Summary is not Present in the Report, So translation is skipped for the report!',
            });
            return null;
        }
    });
}
function sendToTranslate(reportId) {
    return __awaiter(this, void 0, void 0, function* () {
        const limit = pLimit(8);
        const promises = locales.map((locale) => limit(() => translateReport(reportId, locale)));
        return yield Promise.all(promises);
    });
}
function isReportTraslated(reportId, locale) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let report;
            switch (locale) {
                case 'fr':
                    report = yield prismaClient.cmi_RegionalFrench.findFirst({
                        where: { rid: reportId },
                    });
                    break;
                case 'it':
                    report = yield prismaClient.cmi_RegionalItalian.findFirst({
                        where: { rid: reportId },
                    });
                    break;
                case 'de':
                    report = yield prismaClient.cmi_RegionalGerman.findFirst({
                        where: { rid: reportId },
                    });
                    break;
                case 'zh':
                    report = yield prismaClient.cmi_RegionalChinese.findFirst({
                        where: { rid: reportId },
                    });
                    break;
                case 'ru':
                    report = yield prismaClient.cmi_RegionalRussian.findFirst({
                        where: { rid: reportId },
                    });
                    break;
                case 'ko':
                    report = yield prismaClient.cmi_RegionalKorean.findFirst({
                        where: { rid: reportId },
                    });
                    break;
                case 'ja':
                    report = yield prismaClient.cmi_RegionalJapanese.findFirst({
                        where: { rid: reportId },
                    });
                    break;
                case 'pt':
                    report = yield prismaClient.cmi_RegionalPortuguese.findFirst({
                        where: { rid: reportId },
                    });
                    break;
                default:
                    return false;
            }
            if (report === null) {
                return false;
            }
            return true;
        }
        catch (err) {
            logger.log({
                message: 'Got error While checking if report is Alredy translated -> ' + err,
                level: 'error',
            });
        }
    });
}
function startTranslating() {
    return __awaiter(this, void 0, void 0, function* () {
        //Create the Request Limit
        const limit = pLimit(1);
        try {
            const reportIds = yield prismaClient.cmi_reports.findMany({
                select: {
                    newsId: true,
                },
            });
            //Creating the Concurrent Request Promises for the Single Locale
            const promises = reportIds.map((id) => limit(() => sendToTranslate(id.newsId)));
            console.log('From startTranslating -> Expected: 6916 Received:', limit.pendingCount);
            //awaiting on the all promises created at a time for
            yield Promise.all(promises);
            console.log('All reports are translated in all languages!');
        }
        catch (err) {
            throw new Error('Error while Running Script! Please Try Again :' + err);
        }
    });
}
startTranslating();
