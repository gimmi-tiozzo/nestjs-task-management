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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

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
   * @returns Promise alla Lista dei task
   */
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTask(filterDto);
  }

  /**
   * Crea un nuovo task (se si usava @Body() body il parametro body era tutto il corpo della richiesta)
   * @param createTaskDto DTO per la creazione di un task
   * @returns Promise al Nuovo task appena creato
   */
  @Post()
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * Ricerca un task per id
   * @param id id che identifica il task
   * @returns Promise al task trovato
   */
  @Get('/:id')
  public getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  /**
   * Cancella un task per id
   * @param id id del task
   * @returns Promise per l'operazione di delete asincrona
   */
  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  /**
   * Aggiorna lo status di un task
   * @param updateTaskStatusDto Dto per l'aggiornamento dello status di un task
   * @param status
   * @returns Promise task aggiornato
   */
  @Patch('/:id/status')
  public updateTaskStatusById(
    @Param('id') id: string,
    @Body('') updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
