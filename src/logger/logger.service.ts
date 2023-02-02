import 'reflect-metadata';
import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './ILogger';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<unknown>;
	constructor() {
		this.logger = new Logger();
	}

	log(...arg: unknown[]): void {
		this.logger.info(...arg);
	}
	error(...arg: unknown[]): void {
		this.logger.error(...arg);
	}
	warn(...arg: unknown[]): void {
		this.logger.warn(...arg);
	}
}
