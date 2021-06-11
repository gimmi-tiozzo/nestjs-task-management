import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUSer } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

/**
 * Controller per la gestione delle operazioni CRUD relative ai tasks
 */
@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  /**
   * Costruttore
   * @param tasksService servizio per la gestione dei task iniettato tramite dependecy injection
   */
  constructor(private tasksService: TasksService) {}

  /**
   * Ottieni la lista dei task
   * @param filterDto Dto filtro di ricerca
   * @param user Utente autenticato
   * @returns Promise alla Lista dei task
   */
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUSer() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTask(filterDto, user);
  }

  /**
   * Crea un nuovo task (se si usava @Body() body il parametro body era tutto il corpo della richiesta)
   * @param createTaskDto DTO per la creazione di un task
   * @param user Utente autenticato
   * @returns Promise al Nuovo task appena creato
   */
  @Post()
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUSer() user: User,
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  /**
   * Ricerca un task per id
   * @param id id che identifica il task
   * @param user Utente autenticato
   * @returns Promise al task trovato
   */
  @Get('/:id')
  public getTaskById(
    @Param('id') id: string,
    @GetUSer() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  /**
   * Cancella un task per id
   * @param id id del task
   * @param user Utente autenticato
   * @returns Promise per l'operazione di delete asincrona
   */
  @Delete('/:id')
  public deleteTaskById(
    @Param('id') id: string,
    @GetUSer() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  /**
   * Aggiorna lo status di un task
   * @param updateTaskStatusDto Dto per l'aggiornamento dello status di un task
   * @param status
   * @param user Utente autenticato
   * @returns Promise task aggiornato
   */
  @Patch('/:id/status')
  public updateTaskStatusById(
    @Param('id') id: string,
    @Body('') updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUSer() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatusById(id, status, user);
  }
}
