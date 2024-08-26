import fs from 'fs';
import { stringAny } from './formatting';

export const log_file_name = './log.json';

/**
 * Logs to the console
 */
export function log(x: unknown) {
  console.log(stringAny(x));
}

/**
 * Write the input object to a logging file
 */
export function logToFile(x: unknown) {
  // Check if file exists and trim to 1,000 lines
  if (fs.existsSync(log_file_name)) {
    const logFile = fs.readFileSync(log_file_name, 'utf8');
    const lines = logFile.split('\n');
    if (lines.length > 999) {
      fs.writeFileSync(log_file_name, lines.splice(0, lines.length - 1000).join('\n'));
    }
  }
  const logFile = fs.createWriteStream(log_file_name, { flags: 'a' });
  const log = JSON.stringify([{time: new Date().toISOString(),log: stringAny(x)}])
  logFile.write(log);
  logFile.end();
}

export const utils = {
  log,
  logToFile,
};
