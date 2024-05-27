import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { startDate, endDate, horizon } = req.query;
  
      if (!startDate || !endDate || !horizon) {
        return res.status(400).json({ error: 'Missing startDate, endDate, or horizon' });
      }
  
      const horizonMinutes = parseInt(horizon as string);
  
      const forecastData = await prisma.windForecast.findMany({
        where: {
          startTime: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string),
          },
        },
        select: {
          generation: true,
          publishTime: true,
          startTime: true,
        },
        orderBy: {
          startTime: 'asc',
        },
      });
  
      // Filter forecast data based on horizon
      const filteredData = forecastData.filter((item) => {
        const targetTime = new Date(item.startTime);
        const latestValidPublishTime = new Date(targetTime.getTime() - horizonMinutes * 60 * 1000);
        console.log()
        return new Date(item.publishTime) <= latestValidPublishTime;
        
      });
  
      res.status(200).json(filteredData);
    } catch (error) {
      console.error('Error fetching wind forecast data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }