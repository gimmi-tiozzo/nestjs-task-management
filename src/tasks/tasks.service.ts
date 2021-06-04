import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';

/**
 * Servizio per la gestione delle operazioni CRUD relative ai tasks
 */
@Injectable()
export class TasksService {
  /**
   * Tasks gestiti a sistema
   */
  private tasks: Task[] = [];

  /**
   * Ritorna la lista dei task
   * @returns La lista dei task
   */
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Ottieni la lista dei task per filtro di ricerca
   * @param filterDto Dto per la ricerca dei task
   * @returns lista dei task per filtro di ricerca
   */
  public getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    if (search) {
      tasks = tasks.filter((t) => {
        if (
          t.title.toLocaleLowerCase().trim().includes(search) ||
          t.description.toLocaleLowerCase().trim().includes(search)
        ) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  /**
   * Crea un nuovo task e aggiungilo alla lista dei task correnti
   * @param createTaskDto DTO per la creazione di un task
   * @returns Il nuovo task appena creato
   */
  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };

    this.tasks.push(task);
    return task;
  }

  /**
   * Ricerca un task per id
   * @param id id che identifica il task
   * @returns task
   */
  public getTaskById(id: string): Task {
    const found = this.tasks.find((t) => t.id === id);

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return found;
  }

  /**
   * Cancella un task per id
   * @param id id del task
   * @returns task cancellato
   */
  public deleteTaskById(id: string): Task {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index < 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return this.tasks.splice(index, 1)[0];
  }

  /**
   * Aggiorna lo status di un task
   * @param updateTaskStatusDto Dto per l'aggiornamento dello status di un task
   * @param status
   * @returns task aggiornato
   */
  public updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
