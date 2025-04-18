using System.ComponentModel.DataAnnotations.Schema;

namespace TodoAppApi.Models;

public class TaskModel
{
    public int? Id { get; set; }
    public required string Title { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public TaskStatusEnum Status { get; set; } = TaskStatusEnum.Pending;
    public DateTime? DonedAtd { get; set; }
}

public enum TaskStatusEnum
{
    Pending,
    InProcess,
    Done,
}