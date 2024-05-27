// pages/api/generation.ts
import prisma from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse the date and time from the request body
    const { dateTime } = req.body;
    const [date, time] = dateTime.split(' ');
    const [day, month, year] = date.split('/');
    const formattedDateTime = `${year}-${month}-${day}T${time}:00.000Z`;

    // Fetch the generation data from the 'windforecast' table
    const generationData = await prisma.windActual.findMany({
      where: {
            startTime: {
              gte: new Date(formattedDateTime),
            },
          },
      select: {
        generation: true,
      },
    });

    if (generationData.length > 0) {
      res.status(200).json({ generation: generationData[0].generation });
    } else {
      res.status(404).json({ error: "No generation data found for the given date and time" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching generation data" });
  }
}