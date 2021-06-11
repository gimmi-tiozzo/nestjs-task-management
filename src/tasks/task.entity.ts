import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  /**
   * User associato al task
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
