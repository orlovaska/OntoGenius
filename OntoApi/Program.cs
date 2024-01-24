using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql;
using OntoDAL.DataAccess;
using OntoDAL.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "OntoGenius API", Version = "v1" });
});

//��������� �������� ���� ������
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});


////������������� ��� ��������
//string connectionString = "Server=localhost;Port=5432;Database=OntoGenius;User Id=postgres;Password=1234";
//using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
//{
//    try
//    {
//        connection.Open();
//        Console.WriteLine("Connection successful!");
//    }
//    catch (Exception ex)
//    {
//        Console.WriteLine($"Error: {ex.Message}");
//    }
//}
//builder.Services.AddDbContext<DataContext>(options =>
//{
//    options
//        .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
//            assembly => assembly.MigrationsAssembly("SocialCRM.DAL.Implementations.Migrations"));
//});

//��������� IdentityUser � IdentityRole ��� �����������
//builder.Services.AddIdentity<UserModel, RoleModel>(options =>
//    options.User.AllowedUserNameCharacters += " ")
//           .AddEntityFrameworkStores<DataContext>()
//           .AddDefaultTokenProviders();

builder.Services.AddIdentity<UserModel, RoleModel>(options =>
{
    // ���� ��������� ���������...

    //// �������� �������� ClaimsIdentity ��� ���������� ��������� �����������
    //options.ClaimsIdentity.UserIdClaimType = null;
    //options.ClaimsIdentity.UserNameClaimType = null;
})
.AddEntityFrameworkStores<DataContext>()
.AddDefaultTokenProviders();

//���������� ��� ����������� ���������� � JWT (����� ����� �� �����)
using var loggerFactory = LoggerFactory.Create(b => b.SetMinimumLevel(LogLevel.Trace).AddConsole());

//�������� ��������� ���� ��� �������� �������
var secret = builder.Configuration["JWT:Secret"] ?? throw new InvalidOperationException("Secret not configured");
//��������� ������ ����������
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        //TODO -���� �� ���������, ��� ��� ����� ����������� � �������
        //ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        //ValidAudience = builder.Configuration["JWT:ValidAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
        ClockSkew = new TimeSpan(0, 0, 5)
    };
    //���������� ��� �����, ����� ����� �� �����
    options.Events = new JwtBearerEvents
    {
        OnChallenge = ctx => LogAttempt(ctx.Request.Headers, "OnChallenge"),
        OnTokenValidated = ctx => LogAttempt(ctx.Request.Headers, "OnTokenValidated")
    };
});



// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Adjust the origin as needed
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var serviceProvider = builder.Services.BuildServiceProvider();
using (var scope = serviceProvider.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    dbContext.Database.EnsureCreated();
}

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Enable CORS
app.UseCors();

app.MapControllers();

app.Run();

//����� ��� ����������� (����� ����� �� �����)
Task LogAttempt(IHeaderDictionary headers, string eventType)
{
    var logger = loggerFactory.CreateLogger<Program>();

    var authorizationHeader = headers["Authorization"].FirstOrDefault();

    if (authorizationHeader is null)
        logger.LogInformation($"{eventType}. JWT not present");
    else
    {
        string jwtString = authorizationHeader.Substring("Bearer ".Length);

        var jwt = new JwtSecurityToken(jwtString);

        logger.LogInformation($"{eventType}. Expiration: {jwt.ValidTo.ToLongTimeString()}. System time: {DateTime.UtcNow.ToLongTimeString()}");
    }

    return Task.CompletedTask;
}

