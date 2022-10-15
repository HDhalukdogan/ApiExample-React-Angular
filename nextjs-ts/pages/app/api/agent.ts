import axios, { AxiosResponse } from "axios";

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
}

const Sample = {
    list: () => request.get('http://localhost:5065/api/SampleEntities'),
}

const agent = { Sample }

export default agent;