import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';

/**
 * Controller per la gestione delle operazioni CRUD relative ai tasks
 */
@Controller('/tasks')
export class TasksController {
  /**
   * Costruttore
   * @param tasksService servizio per la gestione dei task iniettato tramite dependecy injection
   */
  constructor(private tasksService: TasksService) {}

  /**
   * Ottieni la lista dei task
   * @param filterDto Dto filtro di ricerca
   * @returns Lista dei task
   */
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  /**
   * Crea un nuovo task (se si usava @Body() body il parametro body era tutto il corpo della richiesta)
   * @param createTaskDto DTO per la creazione di un task
   * @returns Nuovo task appena creato
   */
  @Post()
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * Ricerca un task per id
   * @param id id che identifica il task
   * @returns task
   */
  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  /**
   * Cancella un task per id
   * @param id id del task
   * @returns task cancellato
   */
  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Task {
    return this.tasksService.deleteTaskById(id);
  }

  /**
   * Aggiorna lo status di un task
   * @param id id del task
   * @param status
   * @returns task aggiornato
   */
  @Patch('/:id/status')
  public updateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
