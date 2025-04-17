using Microsoft.EntityFrameworkCore;
using TodoAppApi.Models;

namespace TodoAppApi.Controllers;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskModel> Tasks { get; set; }
}