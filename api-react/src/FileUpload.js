import React, { useState } from 'react'
import axios from 'axios'



export default function FileUpload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("name", fileName);

        try {
            const res = await axios.post("http://localhost:5065/api/file", formData);
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <input type="file" onChange={saveFile}/>
            <input type="button" value="upload" onClick={uploadFile}/>
        </div>
    )
}
