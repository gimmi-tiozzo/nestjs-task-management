import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { User } from '../auth/user.entity';
import { MyLogger } from '../logger/my.logger';

/**
 * Servizio per la gestione delle operazioni CRUD relative ai tasks
 */
@Injectable()
export class TasksService {
  /**
   * Costruttore
   * @param taskRepository Repository per l'accesso alle operazioni CRUD per l'entità Task
   * @param logger logger
   */
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext('TasksService');
  }

  /** Ricerca un task per id
   * @param id id che identifica il task
   * @param user Utente autenticato
   * @returns Promise per il task
   */
  public async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });

    if (!found) {
      const message = `Task with id "${id}" not found`;
      this.logger.warn(message);
      throw new NotFoundException(message);
    }

    return found;
  }

  /** Crea un nuovo task e aggiungilo alla lista dei task correnti
   * @param createTaskDto DTO per la creazione di un task
   * @param user Utente autenticato
   * @returns Promise per Il nuovo task appena creato
   */
  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    this.logger.verbose(`CreateTaskDto: ${JSON.stringify(createTaskDto)}`);
    return this.taskRepository.createTask(createTaskDto, user);
  }

  /**
   * Cancella un task per id
   * @param id id del task
   * @param user Utente autenticato
   * @returns Promise per l'operazione di delete asincrona
   */
  public async deleteTaskById(id: string, user: User): Promise<void> {
    const result: DeleteResult = await this.taskRepository.delete({ id, user });

    if (!result.affected) {
      const message = `Task with id "${id}" not found`;
      this.logger.warn(message);
      throw new NotFoundException(message);
    }
  }

  /**
   * Aggiorna lo status di un task
   * @param updateTaskStatusDto Dto per l'aggiornamento dello status di un task
   * @param status
   * @param user Utente autenticato
   * @returns Promise al task aggiornato
   */
  public async updateTaskStatusById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    this.logger.verbose(`id: ${id} - status ${status}`);
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }

  /**
   * Ritorna la lista dei task in base al filtro di ricerca
   * @param filterDto filtro di ricerca
   * @param user Utente autenticato
   * @returns Promise alla Lista dei task
   */
  public async getTasks(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`filterDto: ${JSON.stringify(filterDto)}`);
    return this.taskRepository.getTasks(filterDto, user);
  }
}
