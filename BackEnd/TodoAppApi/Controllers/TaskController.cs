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
                Message = "Falha ao criar a tarefa. Certifique-se que o campo \"Título\" está preenchido",
            });
        }
        return Ok(new ResponseModel { Message = "Tarefa criado com sucesso.", Task = response });
    }

    [HttpDelete("DeleteTask/{Id:int}")]
    public async Task<ActionResult<ResponseModel>> DeleteTask(int Id)
    {
        var response = await _service.DeleteTask(Id);
        if (response is null) return NotFound(new ResponseModel
        {
            Message = "Tarefa não encontrada",
        });
        return Ok(new ResponseModel { Message = "Tarefa deletada com sucesso" });
    }

    [HttpPut("UpdateTask/{Id:int}")]
    public async Task<ActionResult<ResponseModel>> UpdateTask([FromRoute] int Id, [FromBody] TaskModel Task)
    {
        var response = await _service.UpdateTask(Id, Task);
        if(response?.Task is null) return BadRequest(response);
        return Ok(response);
    }

}