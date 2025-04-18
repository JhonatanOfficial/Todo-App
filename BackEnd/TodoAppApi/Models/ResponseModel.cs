namespace TodoAppApi.Models;

public class ResponseModel
{
    public string Message { get; set; } = string.Empty;
    public TaskModel? Task { get; set; }
}