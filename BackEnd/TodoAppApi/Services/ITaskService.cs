using TodoAppApi.Models;

namespace TodoAppApi.Services;

public interface ITaskService
{
    public Task<List<TaskModel>> GetAllTasks();
    public Task<TaskModel?> CreateNewTask(TaskModel Task);
    public Task<TaskModel?> DeleteTask(int Id);
    public Task<ResponseModel?> UpdateTask(int Id, TaskModel Task);
}