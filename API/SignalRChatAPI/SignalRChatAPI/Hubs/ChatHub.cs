using Microsoft.AspNetCore.SignalR;
using SignalRChatAPI.Models;

namespace SignalRChatAPI.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChatRoom(UserConnection conn)
        {
            // Add the user to a specific group (create if it doesnt exist), then broadcast the new user's connection to that group (as an admin).
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.RoomToJoin);
            await Clients.Group(conn.RoomToJoin).SendAsync("ReceiveMessage","admin",$"{conn.Username} has joined {conn.RoomToJoin}");
        }
    }
}
