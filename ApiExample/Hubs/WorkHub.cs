using Microsoft.AspNetCore.SignalR;

namespace ApiExample.Hubs
{
    public class WorkHub : Hub
    {
        private static bool test;
        public WorkHub()
        {
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("Connected", "Hi");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
        public async Task GetWorkHub(bool dis)
        {
            test = dis;
            await Clients.All.SendAsync("ReceiveWork", dis);
        }
        public async Task GetWorkHubTest()
        {
            await Clients.All.SendAsync("ReceiveWorkTest", test);
        }
    }
}
