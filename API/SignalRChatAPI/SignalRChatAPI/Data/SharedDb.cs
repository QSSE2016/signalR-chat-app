using SignalRChatAPI.Models;
using System.Collections.Concurrent;

namespace SignalRChatAPI.Data
{
    public class SharedDb
    {
        // Concurrent Dictionaries are thread-safe so they are perfect for storing all the connections to all chatrooms.
        public ConcurrentDictionary<string, UserConnection> connections { get; } = new ConcurrentDictionary<string, UserConnection>();
    }
}
