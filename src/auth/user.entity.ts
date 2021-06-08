import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
