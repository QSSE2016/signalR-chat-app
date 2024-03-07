# Real-Time Chat Application with SignalR and Angular

This is a demonstration of SignalR, for real-time processing of messages, combined with Angular as front-end. You can pull this project and try it out. You first run the .NET API to setup the local server and then run the angular app. Then simply connect to a lobby and open at least one more instance of the website to see the magic happen. Things to note:

* The lobbies (chatrooms) themselves are not persistent, meaning they aren't stored in some database. This is because storing them isn't really that hard and, to be honest, is a massive pain in the ass.
* You can't actually quit a chat room and go to a new one without closing and opening the site. This is because implementing this is quite trivial and would only require some small changes to the front-end side of things and i decided that it was not worth the time or effort.
* SharedDb service in the back-end is there to keep track of the connections that we have. You could probably also use this to inform users in a chat room when a user leaves but i personally haven't implemented this yet. I guess that could be up to you. Or not. Your choice.

With that being said, this is a great introduction to SignalR and gives you quite a solid understanding of how real-time applications actually work behind the scenes.