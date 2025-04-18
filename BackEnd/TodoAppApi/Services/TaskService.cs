using Microsoft.EntityFrameworkCore;
using TodoAppApi.Controllers;
using TodoAppApi.Models;

namespace TodoAppApi.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _storeContext;
    public TaskService(AppDbContext storeContext)
    {
        _storeContext = storeContext;
    }

    public async Task<List<TaskModel>> GetAllTasks()
    {
        return await _storeContext.Tasks.ToListAsync();
    }
    public async Task<TaskModel?> CreateNewTask(TaskModel Task)
    {
        if (string.IsNullOrWhiteSpace(Task.Title)) return null;
        if (Task.Status == TaskStatusEnum.Done)
        {
            Task.DonedAtd = DateTime.Now;
        }
        _storeContext.Tasks.Add(Task);
        var response = await _storeContext.SaveChangesAsync();
        if (response == 0) return null;

        return Task;
    }

    public async Task<TaskModel?> DeleteTask(int Id)
    {
        var task = await _storeContext.Tasks.FindAsync(Id);
        if (task == null) return null;
        _storeContext.Tasks.Remove(task);
        await _storeContext.SaveChangesAsync();

        return task;
    }
    public async Task<TaskModel?> UpdateTask(int Id, TaskModel Task)
    {
        if (Id != Task.Id) return null;

        var existingTask = await _storeContext.Tasks.FindAsync(Id);

        if (existingTask == null) return null;
        if (Task.Status == TaskStatusEnum.Done && existingTask.Status != TaskStatusEnum.Done)
        {
            existingTask.DonedAtd = DateTime.Now;
        }

        _storeContext.Entry(existingTask).CurrentValues.SetValues(Task);

        await _storeContext.SaveChangesAsync();

        return existingTask;
    }

}