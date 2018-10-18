/**
 * Command Interface
 */
interface CommandInterface {
  _options: object;
  start(): void;
  hasOption(optionName: string): boolean;
}

/**
 * Define and export Command class
 */
export class Command implements CommandInterface {
  _options: { [index:string] : any };

  constructor(options: object) {
    this._options = options;
  }

  get options() {
    return this._options;
  }

  start(): void{}

  hasOption(optionName: string): boolean {
    return this._options.hasOwnProperty(optionName);
  }
}
