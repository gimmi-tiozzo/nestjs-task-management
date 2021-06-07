import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

/**
 * Dto per l'aggiornamento dello status di un task
 */
export class UpdateTaskStatusDto {
  /**
   * Stato del task
   */
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
