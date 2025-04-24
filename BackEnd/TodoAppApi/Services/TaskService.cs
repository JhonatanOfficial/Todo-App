using System.Text.Json;
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
            Task.DonedAt = DateTime.Now;
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
    public async Task<ResponseModel?> UpdateTask(int Id, TaskModel Task)
    {
        if (Id != Task.Id) return null;

        var existingTask = await _storeContext.Tasks.FindAsync(Id);

        if (existingTask == null) return new ResponseModel { Message = "Tarefa não encontrada." };

        if (JsonSerializer.Serialize(Task) == JsonSerializer.Serialize(existingTask)) return new ResponseModel { Message = "Necessário alterar algum campo para prosseguir com a alteração." };

        if (Task.DonedAt != null && (Task.DonedAt < Task.CreatedAt || Task.DonedAt > DateTime.Now))
        {
            return new ResponseModel { Message = "A data de conclusão não pode ser menor que a data de criação e nem maior que a data de hoje." };
        }

        if (Task.Status == TaskStatusEnum.Done && existingTask.Status != TaskStatusEnum.Done)
        {
            Task.DonedAt = DateTime.Now;
        }
        else if (Task.Status != TaskStatusEnum.Done && existingTask.Status == TaskStatusEnum.Done)
        {
            Task.DonedAt = null;
        }

        if (Task.DonedAt != null) Task.Status = TaskStatusEnum.Done;

        _storeContext.Entry(existingTask).CurrentValues.SetValues(Task);
        await _storeContext.SaveChangesAsync();

        return new ResponseModel { Message = "Tarefa atualizada com sucesso.", Task = existingTask };
    }
}