import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';  // Ensure this path is correct

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Missing startDate or endDate' });
    }

    const data = await prisma.windActual.findMany({
      where: {
        startTime: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      },
      select: {
        generation: true,
        startTime: true,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
