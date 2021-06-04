import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

/**
 * Dto filtro di ricerca
 */
export class GetTasksFilterDto {
  /**
   * Stato del task
   */
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  /**
   * String di ricerca
   */
  @IsOptional()
  @IsString()
  search?: string;
}
