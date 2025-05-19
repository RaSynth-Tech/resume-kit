// src/lib/parsers/BasicResumeParser.ts

import { ResumeParser, ParsedResume, ResumeSection } from './types';
import pdf from 'pdf-parse';

export class BasicResumeParser implements ResumeParser {
  private readonly sectionTypes = [
    'education',
    'experience',
    'skills',
    'projects',
    'summary',
    'certifications',
  ];

  /**
   * Parses the given PDF File into raw text and sections.
   */

  constructor() {
    console.log('BasicResumeParser constructor');
  }

  async parse(file: File): Promise<ParsedResume> {
    // Read the file into an ArrayBuffer, then wrap in a Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // const buffer = new Uint8Array(arrayBuffer);

    // Use pdf-parse to extract the full text
    const data = await pdf(buffer);

    // Split into logical sections based on headers
    const sections = this.extractSections(data.text);

    return { rawText: data.text, sections: sections };
  }

  /**
   * Splits a block of text into ordered resume sections.
   */
  private extractSections(text: string): ResumeSection[] {
    const sections: ResumeSection[] = [];
    let currentType = 'summary';
    let currentContent = '';
    let sortIndex = 0;

    // Break raw text into non-empty trimmed lines
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    for (const line of lines) {
      // If the line matches one of our section headers, start a new section
      const matched = this.sectionTypes.find(
        t => line.toLowerCase().includes(t.toLowerCase())
      );

      if (matched) {
        // Push the previous section if it has content
        if (currentContent.trim()) {
          sections.push({
            type: currentType,
            content: currentContent.trim(),
            sort_index: sortIndex++,
          });
        }
        // Reset for the new section
        currentType = matched;
        currentContent = '';
      } else {
        // Accumulate lines into the current section
        currentContent += line + '\n';
      }
    }

    // Push any remaining content as the final section
    if (currentContent.trim()) {
      sections.push({
        type: currentType,
        content: currentContent.trim(),
        sort_index: sortIndex,
      });
    }

    return sections;
  }
}
