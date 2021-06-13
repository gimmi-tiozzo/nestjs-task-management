import { Injectable, Logger, Scope } from '@nestjs/common';
import * as fs from 'fs';

/**
 * Logger su file
 */
@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends Logger {
  /**
   * Path file log
   */
  private filePath: string;

  /**
   * Costruttore di defailt
   */
  constructor() {
    super();
    this.filePath = 'my.log';
  }

  /**
   * Genera un messaggio da tracciare
   * @param message messaggio
   * @param trace stacktrace
   * @returns  messaggio da tracciare
   */
  private generateMessage(message: string, trace?: string) {
    const now: Date = new Date();
    const timestamp: string = Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(now);

    return `[${this.context}] - ${timestamp} - ${message}${
      trace ? '-' + trace : ''
    }\n`;
  }

  /**
   * Info log
   * @param message messaggio di log
   */
  log(message: string) {
    super.log(message);

    fs.appendFile(this.filePath, this.generateMessage(message), (err) => {
      if (err) console.error(err);
    });
  }

  /**
   * Error log
   * @param message messaggio di log
   * @param trace stacktrace
   */
  error(message: string, trace: string) {
    super.error(message, trace);

    fs.appendFile(
      this.filePath,
      this.generateMessage(message, trace),
      (err) => {
        if (err) console.error(err);
      },
    );
  }

  /**
   * Warning log
   * @param message messaggio di log
   */
  warn(message: string) {
    super.warn(message);

    fs.appendFile(this.filePath, this.generateMessage(message), (err) => {
      if (err) console.error(err);
    });
  }

  /**
   * Debug log
   * @param message messaggio di log
   */
  debug(message: string) {
    super.debug(message);

    fs.appendFile(this.filePath, this.generateMessage(message), (err) => {
      if (err) console.error(err);
    });
  }

  /**
   * Verbose log
   * @param message messaggio di log
   */
  verbose(message: string) {
    super.verbose(message);

    fs.appendFile(this.filePath, this.generateMessage(message), (err) => {
      if (err) console.error(err);
    });
  }
}
