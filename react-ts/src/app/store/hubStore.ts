import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { store } from "../store/configureStore";
export default class HubStore {
    hubConnection: HubConnection | null = null;

    constructor() {
    }

    createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5065/workhub", {
                accessTokenFactory: () => store.getState().account.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

        this.hubConnection.on('Connected', (res) => {
            console.log('res', res)
        })

        this.hubConnection.on('Created', (res) => {
            console.log('res', res)
        })

        this.hubConnection.on('Deleted', (res) => {
            console.log('res', res)
        })

    }


    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }
}