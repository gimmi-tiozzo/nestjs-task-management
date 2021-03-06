import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

/**
 * Interceptor
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  /**
   *
   * @param context contesto di esecuzione
   * @param next prossimo handle da richiamare
   * @returns
   */
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map((data) => classToPlain(data)));
  }
}
