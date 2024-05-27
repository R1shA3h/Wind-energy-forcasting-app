// actions.ts
"use server";

import prisma from "@/lib/db";

export async function showGen(req: Request) {
  const { dateInput } = await req.json();
  // Convert the input date from DD/MM/YYYY HH:MM to ISO format
  const [date, time] = dateInput.split(' ');
  const [day, month, year] = date.split('/');
  const isoDate = `${year}-${month}-${day}T${time}:00Z`;

  const generationData = await prisma.windActual.findFirst({
    where: {
      startTime: new Date(isoDate),
    },
    select: {
      generation: true,
    },
  });

  return new Response(JSON.stringify(generationData), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
