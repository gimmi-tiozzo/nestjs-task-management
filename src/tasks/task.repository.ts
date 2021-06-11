import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

/**
 * Repository per per le operazioni CRUD sull'entity Task
 */
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  /** Crea un nuovo task e aggiungilo alla lista dei task correnti
   * @param createTaskDto DTO per la creazione di un task
   * @param user Utente autenticato
   * @returns Promise per Il nuovo task appena creato
   */
  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { title, description } = createTaskDto;

    //crea una nuova entity detached con il DB
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    //attach entity al DB
    await this.save(task);

    return task;
  }

  /**
   * Ritorna la lista dei task in base al filtro di ricerca
   * @param filterDto filtro di ricerca
   * @param user Utente autenticato
   * @returns Promise alla Lista dei task
   */
  public async getTask(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }
}
