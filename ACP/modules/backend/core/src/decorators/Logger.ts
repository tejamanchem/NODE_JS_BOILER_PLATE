import { Container } from "typedi";

import { Logger as WinstonLogger } from "../logger";

export function LoggerDecorator(scope: string): ParameterDecorator {
  return (object:any, propertyKey, index): any => {
    const logger = new WinstonLogger(scope);
    const propertyName = propertyKey ? propertyKey.toString() : "";
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => logger,
    });
  };
}

export { LoggerInterface } from "../logger";
