import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

/**
 * Servizio per la gestione delle operazioni CRUD relative ai tasks
 */
@Injectable()
export class TasksService {
  /**
   * Costruttore
   * @param taskRepository Repository per l'accesso alle operazioni CRUD per l'entità Task
   */
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  //  * Ricerca un task per id
  //  * @param id id che identifica il task
  //  * @returns Promise per il task
  //  */
  public async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return found;
  }

  //  * Crea un nuovo task e aggiungilo alla lista dei task correnti
  //  * @param createTaskDto DTO per la creazione di un task
  //  * @returns Promise per Il nuovo task appena creato
  //  */
  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // /**
  //  * Cancella un task per id
  //  * @param id id del task
  //  * @returns Promise per l'operazione di delete asincrona
  //  */
  public async deleteTaskById(id: string): Promise<void> {
    const result: DeleteResult = await this.taskRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  // /**
  //  * Aggiorna lo status di un task
  //  * @param updateTaskStatusDto Dto per l'aggiornamento dello status di un task
  //  * @param status
  //  * @returns Promise al task aggiornato
  //  */
  public async updateTaskStatusById(
    id: string,
    status: TaskStatus,
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }

  /**
   * Ritorna la lista dei task in base al filtro di ricerca
   * @param filterDto filtro di ricerca
   * @returns Promise alla Lista dei task
   */
  public async getTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTask(filterDto);
  }
}
