import React, { useEffect } from 'react'
import { useState } from 'react'
import {  HubConnectionBuilder } from "@microsoft/signalr";

export default function Work() {
    const [count, setCount] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [dis, setDis] = useState(false)

    const [hubConnection, setHubConnection] = useState()
    const createHubConnection = async () => {
        const hubCn = new HubConnectionBuilder().withUrl("http://localhost:5065/workhub").build()
        try {
            await hubCn.start();
            console.log("connectionId",hubCn.connectionId)
            setHubConnection(hubCn)
        } catch (e) {
            console.log("e", e)
        }
    }
    useEffect(() => {
        createHubConnection()

    }, [])

    const sendDis = () => {
        if (hubConnection) {
            hubConnection.invoke("GetWorkHub",!dis).then((res) => { console.log('res', res) }).catch(err=>console.log('err', err))
        }
    }
    useEffect(() => {
        if (hubConnection) {
            hubConnection.on("ReceiveWork",res => setDis(res))
        }
    }, [hubConnection])

    const handleDis = () => {
        sendDis()
    }

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
            <button onClick={handleDis}>{dis ? "Enable Counter Button" : "Disable Counter Button"}</button>
            <button disabled={dis} onClick={handleClick}>
                {intervalId ? "Stop counting" : "Start counting"}
            </button>
        </div>
    );
}