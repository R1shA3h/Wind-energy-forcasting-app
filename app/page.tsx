import prisma from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const windAct = await prisma.windActual.findFirst()
  return (
    <div>
      <div className="flex justify-center"></div>
    </div>
  );
}
