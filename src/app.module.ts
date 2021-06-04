import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

/**
 * Modulo root
 */
@Module({
  imports: [TasksModule],
})
export class AppModule {}
