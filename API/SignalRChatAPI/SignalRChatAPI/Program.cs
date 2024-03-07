using SignalRChatAPI.Data;
using SignalRChatAPI.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS configuration (obviously you should think about cors in a serious project, here i'm just going to allow everything on my angular app port)
builder.Services.AddCors(options =>
{
    options.AddPolicy("angApp", builder =>
    {
        builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});


// SignalR config
builder.Services.AddSignalR();

// Add the SharedDb Service to keep track of the connections. Singleton here since a. this is shared between components and b. there's no need to re-instantiate it every http request
builder.Services.AddSingleton<SharedDb>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapHub<ChatHub>("chat-hub");

// Actually use CORS settings (don't forget)
app.UseCors("angApp");

app.Run();

