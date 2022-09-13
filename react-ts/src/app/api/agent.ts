import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL='http://localhost:5065/api/'
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;
const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

const Sample = {
    list: () => request.get('SampleEntities'),
    details: (id: number) => request.get(`SampleEntities/${id}`),
    createProduct: (sample: any) => request.postForm('SampleEntities', sample),
    updateProduct: (sample: any,id:number) => request.putForm(`SampleEntities/${id}`, sample),
    deleteProduct: (id: number) => request.delete(`SampleEntities/${id}`)
}

const agent = {Sample}

export default agent;