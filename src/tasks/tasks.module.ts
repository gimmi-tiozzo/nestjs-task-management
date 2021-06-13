import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerModule } from 'src/logger/logger.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

/**
 * Modulo Providers e Controllers relativi ai Task
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
    LoggerModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
