const CONTAINER_URL = "http://localhost:5065/api/SampleEntities";

const Sample = {
    list: async () => {
        const res = await fetch(CONTAINER_URL);
        const data = await res.json();
        return data;
    }
}

const agent = { Sample }

export default agent;