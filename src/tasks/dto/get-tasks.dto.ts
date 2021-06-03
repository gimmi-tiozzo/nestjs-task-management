import { TaskStatus } from '../task.model';

/**
 * Dto filtro di ricerca
 */
export class GetTasksFilterDto {
  /**
   * Stato del task
   */
  status?: TaskStatus;
  /**
   * String di ricerca
   */
  search?: string;
}
