import type { NextApiRequest, NextApiResponse } from 'next'
import agent from '../app/api/agent'


export default async function handlerSamples(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //res.status(200).json(await fetch("http://localhost:5065/api/SampleEntities").then(async res => await res.json()))
    res.status(200).json(await agent.Sample.list())
}


// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//     id: number;
//   name: string
// }
// const CONTAINER_URL = "http://localhost:5065/api/SampleEntities";

// const Sample = {
//     list: async () => {
//         const res = await fetch(CONTAINER_URL);
//         const data = await res.json();
//         return data;
//     }
// }
// export default async function handlerSamples(
//   req: NextApiRequest,
//   res: NextApiResponse<Data[]>
// ) {
//   res.status(200).json(await Sample.list())
// }