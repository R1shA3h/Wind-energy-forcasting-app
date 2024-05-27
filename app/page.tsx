// // page.tsx
"use server";
import prisma from '@/lib/db';
import axios from 'axios';
import { useState } from 'react';

async function getwindact(startt: string | number | Date){
  const windact = await prisma.windActual.findMany({
    where: {
      startTime: new Date(startt),
  },
  select:{
    generation:true,
    id:true
  }
});
return windact;
}

async function getwindfor() {
  const windfor = await prisma.windForecast.findMany({
    where: {
      startTime:"2024-01-31T23:00:00Z",
    },
    select:{
      generation:true,
      startTime:true,
      publishTime:true
    },
  });
  return windfor;
}

//   const start = windfor[0]["startTime"];
//   console.log("wind",start)
//   const starttime = new Date(start)
//   const horizon = 30
//   const publish = new Date(starttime.getTime() - (horizon*60*1000))
//   // const newDateTimeString = ();
//   console.log("publish",publish)

export default async function Home() {
  
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [horizon, setHorizon] = useState(240); // Horizon in minutes (default 4 hours)
  const [windActualData, setWindActualData] = useState([]);
  const [windForecastData, setWindForecastData] = useState([]);
  const [error, setError] = useState('');
  console.log("startdate",startdate);
  const s = await getwindact(startdate);
  console.log(s);
  const fetchWindActual = async () => {
    try {
      setError('');
      const response = await getwindact(startdate);
      // fetch(`/api/getWindActual?startDate=${encodeURIComponent(startdate)}&endDate=${encodeURIComponent(enddate)}`, {
      //   method: 'GET',
      //   headers:{
      //     'Content-Type': 'application/json'
      //   },
      // });
      console.log(response)
      // setWindActualData(response.jso);
    } catch (err) {
      console.error('Error fetching wind actual data:', err);
      setError('Failed to fetch wind actual data');
    }
  };

  const fetchWindForecast = async () => {
    try {
      setError('');
      const res = await getwindfor();
    } catch (err) {
      console.error('Fetch wind forecast error:', err);
      setError('Failed to fetch wind forecast data');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wind Data</h1>
      <div className="mb-4">
        <label className="block mb-1">Start Date</label>
        <input
          type="datetime-local"
          value={startdate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">End Date</label>
        <input
          type="datetime-local"
          value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Horizon (minutes)</label>
        <input
          type="range"
          min="0"
          max="1440"
          step="30"
          value={horizon}
          onChange={(e) => setHorizon(parseInt(e.target.value))}
          className="w-full"
        />
        <span>{horizon} minutes</span>
      </div>
      <div className="mb-4">
        <button
          onClick={fetchWindActual}
          className="bg-blue-500  text-white px-4 py-2 rounded mr-2"
        >
          Get Wind Actual
        </button>
        <button
          onClick={fetchWindForecast}
          className="bg-blue-500  text-white px-4 py-2 rounded"
        >
          Get Wind Forecast
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Wind Actual Data</h2>
        <pre className="bg-gray-100 text-black p-4 rounded">{JSON.stringify(windActualData, null, 2)}</pre>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Wind Forecast Data</h2>
        <pre className="bg-gray-100 text-black p-4 rounded">{JSON.stringify(windForecastData, null, 2)}</pre>
      </div>
    </div>
  );
}























// "use client";
// import { useState } from 'react';
// import prisma from "@/lib/db";
// import Genact from '@/component/Genact';
// import Genfor from '@/component/Genfor';
// async function getwindact(){
//   const windact = await prisma.windActual.findMany({
//     where: {
//       startTime: "2024-01-01T01:30:00Z",
//   },
//   select:{
//     generation:true,
//     id:true
//   }
// });
// return windact;
// }

// async function getwindfor() {
//   const windfor = await prisma.windForecast.findMany({
//     where: {
//       startTime:"2024-01-31T23:00:00Z",
//     },
//     select:{
//       generation:true,
//       startTime:true,
//       publishTime:true
//     },
//   });
//   return windfor;
// }





// export default async function Home() {
//   const windact = await getwindact();
//   const windfor = await getwindfor();
//   console.log(windfor)
  
//   const start = windfor[0]["startTime"];
//   console.log("wind",start)
//   const starttime = new Date(start)
//   const horizon = 30
//   const publish = new Date(starttime.getTime() - (horizon*60*1000))
//   // const newDateTimeString = ();
//   console.log("publish",publish)

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
//       <h1 className="text-3xl font-bold underline">Wind Actual Generation</h1>
//       {
//         windact.map((post)=>{
//           return(
//             <Genact
//               id={post.id}
//               generation={post.generation} />
//           )}
//         )
//       }
//       <h1 className="text-3xl font-bold underline">Wind Forcast Generation</h1>
//       {/* <div className="mb-4">
//          <label className="block mb-1">Horizon (minutes)</label>
//          <input
//            type="range"
//            min="0"
//            max="1440"
//            step="30"
//            value={horizon}
//            onChange={(e) => setHorizon(parseInt(e.target.value))}
//            className="w-full"
//          /> */}
//       {
//         windfor.map((post)=>{
//           const horizon = (new Date(post.startTime).getTime() - new Date(post.publishTime).getTime()) / (1000 * 60 * 60);
//           console.log(horizon)
//           return(

//             <Genfor
//               // id={post.id}
//               generation={post.generation} 
//               startTime={post.startTime}
//               horizon />
//           )
//           })
//       }
//     </div>
//   )
// }