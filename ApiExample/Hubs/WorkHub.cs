using Microsoft.AspNetCore.SignalR;

namespace ApiExample.Hubs
{
    public class WorkHub : Hub
    {
        public WorkHub()
        {

        }
        public async Task GetWorkHub(bool dis)
        {
            await Clients.All.SendAsync("ReceiveWork", dis);
        }
    }
}
