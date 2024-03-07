using Microsoft.AspNetCore.SignalR;
using SignalRChatAPI.Data;
using SignalRChatAPI.Hubs.Interface;
using SignalRChatAPI.Models;

namespace SignalRChatAPI.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private readonly SharedDb sharedDb;

        public ChatHub(SharedDb db)
        {
            sharedDb = db;
        }


        public async Task JoinChatRoom(UserConnection conn)
        {
            // Add the user to a specific group (create if it doesnt exist), then broadcast the new user's connection to that group (as an admin).
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.RoomToJoin);

            sharedDb.connections[Context.ConnectionId] = conn; // update db

            await Clients.Group(conn.RoomToJoin).ReceiveMessage("ADMIN",$"{conn.Username} has joined {conn.RoomToJoin}");
        }

        // Function for a user to send a message to the group he is connected to. (notice that i use a different method name)
        public async Task SendMessage(string message)
        {
            if(sharedDb.connections.TryGetValue(Context.ConnectionId, out var conn))
            {
                await Clients.Group(conn.RoomToJoin).ReceiveMessage(conn.Username, message);
            }
        }
    }
}
