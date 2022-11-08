using Microsoft.AspNetCore.SignalR;

namespace ApiExample.Hubs
{
    public class WorkHub : Hub
    {
        private static bool test;
        public WorkHub()
        {
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
