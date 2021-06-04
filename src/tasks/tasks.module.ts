import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

/**
 * Modulo Providers e Controllers relativi ai Task
 */
@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
