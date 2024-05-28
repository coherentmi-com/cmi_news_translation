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
let locales = ['ru'];
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
            console.log(err);
            console.log('Unable to fetch the Report!');
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
                    console.log('Translated Report ' +
                        reportId +
                        ' Saved Successfully to ' +
                        lang +
                        ' table!');
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
                    console.log('Translated Report ' +
                        reportId +
                        ' Saved Successfully to ' +
                        lang +
                        ' table!');
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
                    console.log('Translated Report ' +
                        reportId +
                        ' Saved Successfully to ' +
                        lang +
                        ' table!');
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
                    console.log('Translated Report ' +
                        reportId +
                        ' Saved Successfully to ' +
                        lang +
                        ' table!');
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
                    console.log('Translated Report ' +
                        reportId +
                        ' Saved Successfully to ' +
                        lang +
                        ' table!');
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
                    console.log('Translated Report ' +
                        reportId +
                        ' Saved Successfully to ' +
                        lang +
                        ' table!');
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
                    console.log('Translated Report ' +
                        reportId +
                        ' Saved Successfully to ' +
                        lang +
                        ' table!');
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
    });
}
let RetryCount = 0;
// Translate the Single Report
function translateReport(reportId, lang) {
    return __awaiter(this, void 0, void 0, function* () {
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
                console.log('Successfully Translated Report with ID ' + reportId + ' to ', lang);
                const today = new Date();
                // Save the translated Text to the respective language table
                try {
                    switch (lang) {
                        case 'fr':
                            if (yield prismaClient.cmi_RegionalChinese.findUnique({
                                where: { trid: reportId },
                            })) {
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
                                console.log('Translated Report ' +
                                    reportId +
                                    ' Saved Successfully to ' +
                                    lang +
                                    ' table!');
                                break;
                            }
                            else {
                                console.log(reportId, ' Report is already translated!');
                                break;
                            }
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
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
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
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
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
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
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
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
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
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
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
                            console.log('Translated Report ' +
                                reportId +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
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
                    return true;
                }
                catch (err) {
                    console.log('Got error while saving the translated report to database!', err);
                    console.log('Retrying...!');
                    //Retry saving the record to the database
                    yield Retry(reportId, translatedReport, lang);
                }
            }
            catch (err) {
                console.log('Unable to Translate the Report ' + reportId + ' to ' + lang);
                console.log(err);
                console.log('Retrying...!');
                if (RetryCount <= 3) {
                    //If translating server got the error while translating recalling the function recursively
                    const isRetried = yield translateReport(reportId, lang);
                    if (isRetried) {
                        return true;
                    }
                    else {
                        RetryCount += 1;
                        return false;
                    }
                }
                else {
                    console.log('Retry limit is Over! Failed to translating the Report Id : ', reportId);
                    return false;
                }
            }
        }
        else {
            console.log('Summary is not Present in the Report, So translation is skipped for the report!');
            return null;
        }
    });
}
function isReportTraslated(reportId, locale) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let report;
            switch (locale) {
                case 'fr':
                    report = yield prismaClient.cmi_RegionalFrench.findUnique({
                        where: { trid: reportId },
                    });
                    break;
                case 'it':
                    report = yield prismaClient.cmi_RegionalItalian.findUnique({
                        where: { trid: reportId },
                    });
                    break;
                case 'de':
                    report = yield prismaClient.cmi_RegionalGerman.findUnique({
                        where: { trid: reportId },
                    });
                    break;
                case 'zh':
                    report = yield prismaClient.cmi_RegionalChinese.findUnique({
                        where: { trid: reportId },
                    });
                    break;
                case 'ru':
                    report = yield prismaClient.cmi_RegionalRussian.findUnique({
                        where: { trid: reportId },
                    });
                    break;
                case 'ko':
                    report = yield prismaClient.cmi_RegionalKorean.findUnique({
                        where: { trid: reportId },
                    });
                    break;
                case 'ja':
                    report = yield prismaClient.cmi_RegionalJapanese.findUnique({
                        where: { trid: reportId },
                    });
                    break;
                case 'pt':
                    report = yield prismaClient.cmi_RegionalPortuguese.findUnique({
                        where: { trid: reportId },
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
            console.log(err);
        }
    });
}
function startTranslating() {
    return __awaiter(this, void 0, void 0, function* () {
        //Create the Request Limit
        const limit = pLimit(1);
        const reportIds = yield prismaClient.cmi_reports.findMany({
            where: {
                newsId: {
                    lte: 10,
                },
            },
            select: {
                newsId: true,
            },
        });
        // //First Loop for the Locales Array
        for (const locale of locales) {
            console.log('###################### Translating the Report in ' +
                locale +
                ' #######################');
            //Creating the Concurrent Request Promises for the Single Locale
            const promises = reportIds.map((id) => __awaiter(this, void 0, void 0, function* () {
                if (yield isReportTraslated(id.newsId, locale)) {
                    console.log('Report with ID ' + id.newsId + ' is already translated!');
                    return;
                }
                limit(() => translateReport(id.newsId, locale));
            }));
            //awaiting on the all promises created at a time for
            yield Promise.all(promises);
        }
    });
}
console.log(new Date());
startTranslating();
