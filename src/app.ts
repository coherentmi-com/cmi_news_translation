import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prismaClient = new PrismaClient();

let locales = ['fr', 'de', 'it', 'ru', 'ja', 'ar', 'zh', 'ko', 'pt'];

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

    return report;
  } catch (err) {
    console.log('Unable to fetch the Report!');
  }
}

//Translate the Single Report
async function translateReport() {
  const report = await getReport(1);

  if (report) {
    const reportValues = Object.values(report);

    const data = {
      q: reportValues,
      source: 'en',
      target: 'de',
      format: 'html',
    };

    try {
      const res = await axios.post('http://35.90.100.70/translate', data);

      const translatedText = res.data.translatedText;

      return translatedText;
    } catch (err) {
      console.log('Unable to Translate the  Report!');
    }
  }
  return null;
}

translateReport();
