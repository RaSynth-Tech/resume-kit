// src/lib/parsers/BasicResumeParser.ts

import { ResumeParser, ParsedResume, ResumeSection } from './types';
import pdf from 'pdf-parse';

export class BasicResumeParser implements ResumeParser {
  constructor() {
    console.log('BasicResumeParser initialized');
  }

  /**
   * Parses the given PDF file and returns a single raw_text section.
   */
  async parse(file: File): Promise<ParsedResume> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const data = await pdf(buffer);

    const rawSection: ResumeSection = {
      type: 'raw_text',
      content: data.text.trim(),
      sort_index: 0,
    };

    const parsedResume: ParsedResume = {
      rawText: data.text,
      sections: [rawSection],
    };
    return parsedResume;
  }
}
