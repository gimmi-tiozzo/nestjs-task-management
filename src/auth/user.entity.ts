import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

/**
 * Classe che rappresenta un utente
 */
@Entity()
export class User {
  /**
   * Id utente
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Username
   */
  @Column({ unique: true })
  username: string;

  /**
   * Password
   */
  @Column()
  password: string;

  /**
   * Task associati all'utente
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
