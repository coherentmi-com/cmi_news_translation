import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import pLimit from 'p-limit';
import winston, { level } from 'winston';

//Winston Logger to store the all logs to the seperate files.
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => {
      let logMsg = `${info.timestamp} [${info.level.toUpperCase()}]: ${
        info.message
      }`;
      if (info.durationMs) {
        logMsg += ` (Duration: ${info.durationMs} ms)`;
      }
      return logMsg;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: 'running.log',
      level: 'info',
      options: { flags: 'w' },
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      options: { flags: 'w' },
    }),
  ],
});

const prismaClient = new PrismaClient();

let locales = ['ru'];

//Fetch the report From the database
async function getReport(id: number) {
  try {
    const report = await prismaClient.cmi_reports.findUnique({
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

    if (report?.summary === '' || report?.summary === null) {
      return null;
    }

    return report;
  } catch (err) {
    console.log(err);
    console.log('Unable to fetch the Report!');
  }
}

//Retry Saving report to the database
async function Retry(
  reportId: number,
  translatedReport: string[],
  lang: string
) {
  const today = new Date();

  // Save the translated Text to the specific language table
  try {
    switch (lang) {
      case 'fr':
        await prismaClient.cmi_RegionalFrench.create({
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
          message:
            'Translated Report ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'de':
        await prismaClient.cmi_RegionalGerman.create({
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
          message:
            'Translated Report ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'it':
        await prismaClient.cmi_RegionalItalian.create({
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
          message:
            'Translated Report ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'ru':
        await prismaClient.cmi_RegionalRussian.create({
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
          message:
            'Translated Report ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'ja':
        await prismaClient.cmi_RegionalJapanese.create({
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
          message:
            'Translated Report ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'zh':
        await prismaClient.cmi_RegionalChinese.create({
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
          message:
            'Translated Report ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'ko':
        await prismaClient.cmi_RegionalKorean.create({
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
          message:
            'Translated Report ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'pt':
        await prismaClient.cmi_RegionalPortuguese.create({
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
          message:
            'Translated Report ' +
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
  } catch (err) {
    logger.log({
      level: 'error',
      message:
        'Got error while saving the translated report to database :->' + err,
    });
  }
}

let RetryCount = 0;

// Translate the Single Report
async function translateReport(reportId: number, lang: string) {
  //fetch the report from Database
  const report = await getReport(reportId);

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
      const res = await axios.post('http://52.89.187.86/translate', data);

      //Taking the translatedText array from the response
      const translatedReport = res.data.translatedText;

      logger.log({
        level: 'info',
        message: 'Successfully Translated Report with ID ' + reportId + ' to ',
        lang,
      });

      const today = new Date();

      // Save the translated Text to the respective language table
      try {
        switch (lang) {
          case 'fr':
            await prismaClient.cmi_RegionalFrench.create({
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
              message:
                'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'de':
            await prismaClient.cmi_RegionalGerman.create({
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
              message:
                'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'it':
            await prismaClient.cmi_RegionalItalian.create({
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
              message:
                'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'ru':
            await prismaClient.cmi_RegionalRussian.create({
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
              message:
                'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'ja':
            await prismaClient.cmi_RegionalJapanese.create({
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
              message:
                'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'zh':
            await prismaClient.cmi_RegionalChinese.create({
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
              message:
                'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'ko':
            await prismaClient.cmi_RegionalKorean.create({
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
              message:
                'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'pt':
            await prismaClient.cmi_RegionalPortuguese.create({
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
              message:
                'Translated Report ' +
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
        return true;
      } catch (err) {
        logger.log({
          level: 'error',
          message:
            'Got error while saving the translated report to database!' + err,
        });
        logger.log({ level: 'info', message: 'Retrying...!' });

        //Retry saving the record to the database
        await Retry(reportId, translatedReport, lang);
      }
    } catch (err) {
      logger.log({
        level: 'error',
        message:
          'Unable to Translate the Report ' +
          reportId +
          ' to ' +
          lang +
          ' error is :-> ' +
          err,
      });
      logger.log({ level: 'info', message: 'Retrying...!' });

      if (RetryCount <= 3) {
        //If translating server got the error while translating recalling the function recursively
        const isRetried = await translateReport(reportId, lang);

        if (isRetried) {
          return true;
        } else {
          RetryCount += 1;
          return false;
        }
      } else {
        logger.log({
          level: 'info',
          message:
            'Retry limit is Over! Failed to translating the Report Id : ' +
            reportId,
        });
        return false;
      }
    }
  } else {
    logger.log({
      level: 'info',
      message:
        'Summary is not Present in the Report, So translation is skipped for the report!',
    });
    return null;
  }
}

async function isReportTraslated(reportId: number, locale: string) {
  try {
    let report;
    switch (locale) {
      case 'fr':
        report = await prismaClient.cmi_RegionalFrench.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'it':
        report = await prismaClient.cmi_RegionalItalian.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'de':
        report = await prismaClient.cmi_RegionalGerman.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'zh':
        report = await prismaClient.cmi_RegionalChinese.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'ru':
        report = await prismaClient.cmi_RegionalRussian.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'ko':
        report = await prismaClient.cmi_RegionalKorean.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'ja':
        report = await prismaClient.cmi_RegionalJapanese.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'pt':
        report = await prismaClient.cmi_RegionalPortuguese.findFirst({
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
  } catch (err) {
    console.log(err);
  }
}

async function startTranslating() {
  //Create the Request Limit
  const limit = pLimit(30);

  const reportIds = await prismaClient.cmi_reports.findMany({
    where: {
      newsId: {
        lte: 15,
      },
    },
    select: {
      newsId: true,
    },
  });

  // //First Loop for the Locales Array
  for (const locale of locales) {
    logger.log({
      level: 'info',
      message:
        '###################### Translating the Report in ' +
        locale +
        ' #######################',
    });

    //Creating the Concurrent Request Promises for the Single Locale
    const promises = reportIds.map(async (id: any) => {
      if (await isReportTraslated(id.newsId, locale)) {
        console.log('Report with ID ' + id.newsId + ' is already translated!');
        return;
      } else {
        return limit(() => translateReport(id.newsId, locale));
      }
    });

    //awaiting on the all promises created at a time for
    await Promise.all(promises);
  }
}

startTranslating();
