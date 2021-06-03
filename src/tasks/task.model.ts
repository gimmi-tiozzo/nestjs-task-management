/**
 * Task
 */
export interface Task {
  /**
   * Id del task
   */
  id: string;
  /**
   * Titolo del task
   */
  title: string;
  /**
   * Descrizione del task
   */
  description: string;
  /**
   * Stato del task
   */
  status: TaskStatus;
}

/**
 * Stati di un task
 */
export enum TaskStatus {
  /**
   * creato
   */
  OPEN = 'OPEN',
  /**
   * In corso
   */
  IN_PROGRESS = 'IN_PROGRESS',
  /**
   * Chiuso
   */
  DONE = 'DONE',
}
