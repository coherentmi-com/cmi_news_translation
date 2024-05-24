import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import pLimit from 'p-limit';

const prismaClient = new PrismaClient();

let locales = ['fr', 'it', 'ru', 'ja', 'ar', 'ko', 'pt'];

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
  } catch (err) {
    console.log('Unable to fetch the Report!');
  }
}

//Translate the Single Report
async function translateReport(reportId: number, lang: string) {
  //fetch the report from Database
  const report = await getReport(reportId);

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
      const res = await axios.post('http://52.89.187.86/translate', data);

      //Taking the translatedText array from the response
      const translatedReport = res.data.translatedText;

      console.log(
        'Successfully Translated Report with ID ' + reportId + ' to ',
        lang
      );

      //Save the translated Text to the specific language table
      try {
        switch (lang) {
          case 'fr':
            await prismaClient.cmi_reports_fr.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'de':
            await prismaClient.cmi_reports_de.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'it':
            await prismaClient.cmi_reports_it.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'ru':
            await prismaClient.cmi_reports_ru.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'ja':
            await prismaClient.cmi_reports_ja.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'ar':
            await prismaClient.cmi_reports_ar.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'zh':
            await prismaClient.cmi_reports_zh.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'ko':
            await prismaClient.cmi_reports_ko.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'pt':
            await prismaClient.cmi_reports_pt.create({
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
            console.log(
              'Translated Report ' +
                reportId +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          default:
            console.log('No Locale was matched!');
            break;
        }
      } catch (err) {
        console.log(
          'Got error while saving the translated report to database!'
        );
      }
    } catch (err) {
      console.log('Unable to Translate the Report ' + reportId + ' to ' + lang);
    }
  } else {
    console.log('There is Not Report received to translate!');
    return null;
  }
}

async function translate() {
  //Create the Request Limit
  const limit = pLimit(10);

  const reportIds = await prismaClient.cmi_reports.findMany({
    where: {
      newsId: {
        gt: 10,
      },
    },
    select: {
      newsId: true,
    },
  });

  const promises = reportIds.map((id) =>
    limit(() => translateReport(id.newsId, 'zh'))
  );

  await Promise.all(promises);
  console.log('All Reports are Translated !');

  // for (const locale of locales) {
  //   console.log('###################### First Loop #######################');
  //   for (const id of reportIds) {
  //     console.log('####################### Second Loop ######################');
  //     await translateReport(id.newsId, locale);
  //   }
  // }
}

translate();
