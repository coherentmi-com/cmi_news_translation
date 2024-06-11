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
async function getNews(id: number) {
  try {
    const report = await prismaClient.cmi_news.findFirst({
      where: {
        rid: id,
      },
      select: {
        prmetatitle: true,
        prmetadesc: true,
        prmetakeywords: true,
        view_desc: true,
        title: true,
      },
    });

    return report;
  } catch (err) {
    logger.log({
      level: 'error',
      message: 'Unable to fetch the News!' + err,
    });
    return null;
  }
}

//Retry Saving report to the database
async function Retry(reportId: number, translatedNews: string[], lang: string) {
  // Save the translated Text to the specific language table
  try {
    switch (lang) {
      case 'fr':
        await prismaClient.cmi_news_fr.create({
          data: {
            reportId: reportId,
            title: translatedNews[0],
            prmeta_title: translatedNews[1],
            prmeta_description: translatedNews[2],
            prmeta_keywords: translatedNews[3],
            view_desc: translatedNews[4],
          },
        });
        logger.log({
          level: 'info',
          message:
            'Translated News ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'de':
        await prismaClient.cmi_news_de.create({
          data: {
            reportId: reportId,
            title: translatedNews[0],
            prmeta_title: translatedNews[1],
            prmeta_description: translatedNews[2],
            prmeta_keywords: translatedNews[3],
            view_desc: translatedNews[4],
          },
        });
        logger.log({
          level: 'info',
          message:
            'Translated News ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'it':
        await prismaClient.cmi_news_it.create({
          data: {
            reportId: reportId,
            title: translatedNews[0],
            prmeta_title: translatedNews[1],
            prmeta_description: translatedNews[2],
            prmeta_keywords: translatedNews[3],
            view_desc: translatedNews[4],
          },
        });
        logger.log({
          level: 'info',
          message:
            'Translated News ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'ru':
        await prismaClient.cmi_news_ru.create({
          data: {
            reportId: reportId,
            title: translatedNews[0],
            prmeta_title: translatedNews[1],
            prmeta_description: translatedNews[2],
            prmeta_keywords: translatedNews[3],
            view_desc: translatedNews[4],
          },
        });
        logger.log({
          level: 'info',
          message:
            'Translated News ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'ja':
        await prismaClient.cmi_news_ja.create({
          data: {
            reportId: reportId,
            title: translatedNews[0],
            prmeta_title: translatedNews[1],
            prmeta_description: translatedNews[2],
            prmeta_keywords: translatedNews[3],
            view_desc: translatedNews[4],
          },
        });
        logger.log({
          level: 'info',
          message:
            'Translated News ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'zh':
        await prismaClient.cmi_news_zh.create({
          data: {
            reportId: reportId,
            title: translatedNews[0],
            prmeta_title: translatedNews[1],
            prmeta_description: translatedNews[2],
            prmeta_keywords: translatedNews[3],
            view_desc: translatedNews[4],
          },
        });
        logger.log({
          level: 'info',
          message:
            'Translated News ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'ko':
        await prismaClient.cmi_news_ko.create({
          data: {
            reportId: reportId,
            title: translatedNews[0],
            prmeta_title: translatedNews[1],
            prmeta_description: translatedNews[2],
            prmeta_keywords: translatedNews[3],
            view_desc: translatedNews[4],
          },
        });
        logger.log({
          level: 'info',
          message:
            'Translated News ' +
            reportId +
            ' Saved Successfully to ' +
            lang +
            ' table!',
        });
        break;

      case 'pt':
        await prismaClient.cmi_news_pt.create({
          data: {
            reportId: reportId,
            title: translatedNews[0],
            prmeta_title: translatedNews[1],
            prmeta_description: translatedNews[2],
            prmeta_keywords: translatedNews[3],
            view_desc: translatedNews[4],
          },
        });
        logger.log({
          level: 'info',
          message:
            'Translated News ' +
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
  } catch (err) {
    logger.log({
      level: 'error',
      message:
        'Got error while Retrying to save the translated news to database :->' +
        err,
    });
  }
}

let RetryCount = 1;
let saveRetry = 1;

// Translate the Single Report
async function translateNews(reportId: number, lang: string) {
  //Precheck if the report is already translated
  const isPresent = await isNewsTraslated(reportId, lang);
  if (isPresent) {
    console.log('News with ID ' + reportId + ' is already translated!');
    return;
  }

  //fetch the report from Database
  const pr = await getNews(reportId);

  if (pr) {
    const prValues = [
      pr.title,
      pr.prmetatitle,
      pr.prmetadesc,
      pr.prmetakeywords,
      pr.view_desc,
    ];

    //Request Body
    const data = {
      q: prValues,
      source: 'en',
      target: lang,
      format: 'html',
    };

    try {
      //Send the report text for the translation and await on request
      const res = await axios.post('http://52.89.187.86/translate', data);

      //Taking the translatedText array from the response
      const translatedNews = res.data.translatedText;

      logger.log({
        level: 'info',
        message:
          'Successfully Translated News with ID ' + reportId + ' to ' + lang,
      });

      const today = new Date();

      // Save the translated Text to the respective language table
      try {
        switch (lang) {
          case 'fr':
            await prismaClient.cmi_news_fr.create({
              data: {
                reportId: reportId,
                title: translatedNews[0],
                prmeta_title: translatedNews[1],
                prmeta_description: translatedNews[2],
                prmeta_keywords: translatedNews[3],
                view_desc: translatedNews[4],
              },
            });
            logger.log({
              level: 'info',
              message:
                'Translated News ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'de':
            await prismaClient.cmi_news_de.create({
              data: {
                reportId: reportId,
                title: translatedNews[0],
                prmeta_title: translatedNews[1],
                prmeta_description: translatedNews[2],
                prmeta_keywords: translatedNews[3],
                view_desc: translatedNews[4],
              },
            });
            logger.log({
              level: 'info',
              message:
                'Translated News ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'it':
            await prismaClient.cmi_news_it.create({
              data: {
                reportId: reportId,
                title: translatedNews[0],
                prmeta_title: translatedNews[1],
                prmeta_description: translatedNews[2],
                prmeta_keywords: translatedNews[3],
                view_desc: translatedNews[4],
              },
            });
            logger.log({
              level: 'info',
              message:
                'Translated News ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'ru':
            await prismaClient.cmi_news_ru.create({
              data: {
                reportId: reportId,
                title: translatedNews[0],
                prmeta_title: translatedNews[1],
                prmeta_description: translatedNews[2],
                prmeta_keywords: translatedNews[3],
                view_desc: translatedNews[4],
              },
            });
            logger.log({
              level: 'info',
              message:
                'Translated News ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'ja':
            await prismaClient.cmi_news_ja.create({
              data: {
                reportId: reportId,
                title: translatedNews[0],
                prmeta_title: translatedNews[1],
                prmeta_description: translatedNews[2],
                prmeta_keywords: translatedNews[3],
                view_desc: translatedNews[4],
              },
            });
            logger.log({
              level: 'info',
              message:
                'Translated News ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'zh':
            await prismaClient.cmi_news_zh.create({
              data: {
                reportId: reportId,
                title: translatedNews[0],
                prmeta_title: translatedNews[1],
                prmeta_description: translatedNews[2],
                prmeta_keywords: translatedNews[3],
                view_desc: translatedNews[4],
              },
            });
            logger.log({
              level: 'info',
              message:
                'Translated News ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'ko':
            await prismaClient.cmi_news_ko.create({
              data: {
                reportId: reportId,
                title: translatedNews[0],
                prmeta_title: translatedNews[1],
                prmeta_description: translatedNews[2],
                prmeta_keywords: translatedNews[3],
                view_desc: translatedNews[4],
              },
            });
            logger.log({
              level: 'info',
              message:
                'Translated News ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!',
            });
            break;

          case 'pt':
            await prismaClient.cmi_news_pt.create({
              data: {
                reportId: reportId,
                title: translatedNews[0],
                prmeta_title: translatedNews[1],
                prmeta_description: translatedNews[2],
                prmeta_keywords: translatedNews[3],
                view_desc: translatedNews[4],
              },
            });
            logger.log({
              level: 'info',
              message:
                'Translated News ' +
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
      } catch (err) {
        logger.log({
          level: 'error',
          message:
            'Got error while saving the translated news to database!' + err,
        });
        logger.log({ level: 'info', message: 'Retrying...!' });

        if (saveRetry <= 3) {
          saveRetry += 1;
          //Retry saving the record to the database
          await Retry(reportId, translatedNews, lang);
        } else {
          saveRetry = 0;
          return;
        }
      }
    } catch (err) {
      logger.log({
        level: 'error',
        message:
          'Unable to Translate the News ' +
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
        await translateNews(reportId, lang);
      } else {
        RetryCount = 0;
        logger.log({
          level: 'info',
          message:
            'Retry limit is Over! Failed to translating the report Id : ' +
            reportId,
        });
        return false;
      }
    }
  }
}

async function sendToTranslate(reportId: number) {
  const limit = pLimit(8);

  const promises = locales.map((locale) =>
    limit(() => translateNews(reportId, locale))
  );
  return await Promise.all(promises);
}

async function isNewsTraslated(reportId: number, locale: string) {
  try {
    let report;
    switch (locale) {
      case 'fr':
        report = await prismaClient.cmi_news_fr.findFirst({
          where: { reportId: reportId },
        });
        break;
      case 'it':
        report = await prismaClient.cmi_news_it.findFirst({
          where: { reportId: reportId },
        });
        break;
      case 'de':
        report = await prismaClient.cmi_news_de.findFirst({
          where: { reportId: reportId },
        });
        break;
      case 'zh':
        report = await prismaClient.cmi_news_zh.findFirst({
          where: { reportId: reportId },
        });
        break;
      case 'ru':
        report = await prismaClient.cmi_news_ru.findFirst({
          where: { reportId: reportId },
        });
        break;
      case 'ko':
        report = await prismaClient.cmi_news_ko.findFirst({
          where: { reportId: reportId },
        });
        break;
      case 'ja':
        report = await prismaClient.cmi_news_ja.findFirst({
          where: { reportId: reportId },
        });
        break;
      case 'pt':
        report = await prismaClient.cmi_news_pt.findFirst({
          where: { reportId: reportId },
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
    logger.log({
      message:
        'Got error While checking if report is Alredy translated -> ' + err,
      level: 'error',
    });
  }
}

async function startTranslating() {
  //Create the Request Limit
  const limit = pLimit(1);
  try {
    const reportIds = await prismaClient.cmi_news.findMany({
      where: {
        rid: 24,
      },
      select: {
        rid: true,
      },
    });

    //Creating the Concurrent Request Promises for the Single Locale
    const promises = reportIds.map((id: any) =>
      limit(() => sendToTranslate(id.rid))
    );

    //awaiting on the all promises created at a time for
    await Promise.all(promises);

    console.log('All News are translated in all languages!');
  } catch (err) {
    throw new Error('Error while Running Script! Please Try Again :' + err);
  }
}

startTranslating();
