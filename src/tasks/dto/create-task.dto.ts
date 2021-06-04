import { IsNotEmpty } from 'class-validator';

/**
 * DTO per la creazione di un task
 */
export class CreateTaskDto {
  /**
   * Titolo del task
   */
  @IsNotEmpty()
  title: string;
  /**
   * Descrizione del task
   */
  @IsNotEmpty()
  description: string;
}
