import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Work() {
    const [count, setCount] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [dis, setDis] = useState(false)
    const getDis = () => {
        axios.get(`http://localhost:5065/api/Work/${dis}`).then((response) => {
            console.log('response', response)
            setDis(response.data);
        });
    }
    const handleDis = () => {
        axios.get(`http://localhost:5065/api/Work/${!dis}`).then((response) => {
            setDis(response.data);
        });
    }
    useEffect(() => {
        getDis();
    }, [dis]);


    const handleClick = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
            return;
        }

        const newIntervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);
        setIntervalId(newIntervalId);
    };

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleDis}>{dis?"Enable Counter Button":"Disable Counter Button"}</button>
            <button disabled={dis} onClick={handleClick}>
                {intervalId ? "Stop counting" : "Start counting"}
            </button>
        </div>
    );
}