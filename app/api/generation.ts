// pages/api/generation.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

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
        AND: [
          {
            startTime: {
              gte: new Date(formattedDateTime),
            },
          },
        ],
      },
      select: {
        generation: true,
      },
    });

    // Respond with the fetched data
    res.status(200).json(generationData);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "Error fetching generation data" });
  }
}
