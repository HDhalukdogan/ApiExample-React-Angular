import axios, { AxiosResponse } from "axios";

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody)
}

const Sample = {
    list: () => request.get('http://localhost:5065/api/SampleEntities'),
    details: (id: number) => request.get(`http://localhost:5065/api/SampleEntities/${id}`),
    createSample: (sample: any) => request.post('http://localhost:5065/api/SampleEntities', sample),
    updateSample: (sample: any, id: number) => request.put(`http://localhost:5065/api/SampleEntities/${id}`, sample),
    deleteSample: (id: number) => request.delete(`http://localhost:5065/api/SampleEntities/${id}`)
}


const agent = { Sample }

export default agent;