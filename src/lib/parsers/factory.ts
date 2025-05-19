import { ParserFactory, ParserType, ResumeParser } from './types';
import { BasicResumeParser } from './basicParser';

export class ResumeParserFactory implements ParserFactory {
  private static instance: ResumeParserFactory;
  private parsers: Map<ParserType, ResumeParser>;

  private constructor() {
    this.parsers = new Map();
    this.parsers.set('basic', new BasicResumeParser());
  }

  public static getInstance(): ResumeParserFactory {
    if (!ResumeParserFactory.instance) {
      ResumeParserFactory.instance = new ResumeParserFactory();
    }
    return ResumeParserFactory.instance;
  }

  public getParser(type: ParserType): ResumeParser {
    const parser = this.parsers.get(type);
    if (!parser) {
      throw new Error(`Parser type '${type}' not supported`);
    }
    return parser;
  }
} 