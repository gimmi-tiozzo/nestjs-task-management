import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

/**
 * Task
 */
@Entity()
export class Task {
  /**
   * Id del task
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Titolo del task
   */
  @Column()
  title: string;
  /**
   * Descrizione del task
   */
  @Column()
  description: string;
  /**
   * Stato del task
   */
  @Column()
  status: TaskStatus;
}
