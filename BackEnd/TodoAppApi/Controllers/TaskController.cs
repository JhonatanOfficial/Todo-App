using Microsoft.AspNetCore.Mvc;
using TodoAppApi.Models;
using TodoAppApi.Services;

namespace TodoAppApi.Controllers;

[Route("api/tasks")]
[ApiController]
public class TaskController : ControllerBase
{
    private readonly TaskService _service;
    public TaskController(TaskService service)
    {
        _service = service;
    }

    [HttpGet("GetAllTasks")]
    public async Task<List<TaskModel>> GetAllTasks()
    {
        return await _service.GetAllTasks();
    }

    [HttpPost("CreateNewTask")]
    public async Task<ActionResult> CreateNewTask([FromBody] TaskModel Task)
    {
        var response = await _service.CreateNewTask(Task);
        if (response is null)
        {
            return BadRequest(new ResponseModel
            {
                Message = "Failed to create the task. Make sure the \"Title\" field was filled in.",
            });
        }
        return Ok(new ResponseModel { Message = "Task created successfully.", Task = response });
    }

    [HttpDelete("DeleteTask/{id}")]
    public async Task<ActionResult<ResponseModel>> DeleteTask(int Id)
    {

        var response = await _service.DeleteTask(Id);
        if (response is null) return BadRequest(new ResponseModel
        {
            Message = "Task not found",
        });
        return Ok(new ResponseModel { Message = "Task successfully deleted." });
    }

    [HttpPost("UpdateTask/{Id}")]
    public async Task<ActionResult<ResponseModel>> UpdateTask([FromRoute] int Id, [FromBody] TaskModel Task)
    {
        var response = await _service.UpdateTask(Id, Task);
        if(response is null) return BadRequest(
            new ResponseModel{Message = "Error updating task"}
        );
        return Ok(new ResponseModel{Message = "Task updated successfully", Task = response});
    }
}