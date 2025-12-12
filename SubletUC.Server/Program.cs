using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SubletUC.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Add DB Context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SubletUCContext>(options =>
    options.UseSqlServer(connectionString));

// 2. Add CORS (Allow React frontend running on localhost:3000 or similar)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000") // Update with your frontend URL
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SubletUC API", Version = "v1" });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpsRedirection(options =>
{
    // This tells the middleware: "If a user comes in on HTTP, send them to HTTPS port 7123"
    options.HttpsPort = 7123; 
    options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 3. Use CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();

app.MapGet("/", context => 
{
    context.Response.Redirect("/swagger/index.html");
    return Task.CompletedTask;
});
// app.MapGet("/", () => "API is running! Go to /swagger to see the documentation.");

app.Run();