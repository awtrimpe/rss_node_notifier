import { expect } from 'chai';
import fs from 'fs';
import { describe } from 'mocha';
import { SinonSpy, assert, restore, spy, stub } from 'sinon';
import { utils } from '../../src/services/formatting';
import { log, logToFile, log_file_name } from '../../src/services/logging';

let stringSpy: SinonSpy;

describe('logging.ts', () => {
  beforeEach(() => {
    if (fs.existsSync(log_file_name)) {
      fs.rmSync(log_file_name);
    }
    stringSpy = spy(console, 'log');
  });

  afterEach(() => {
    restore();
  });

  describe('log()', () => {
    it('should call stringAny() before log', () => {
      const msg = 'Hello world!';
      stub(utils, 'stringAny').returns(msg);
      log(msg);
      assert.calledOnce(stringSpy);
      assert.calledWith(stringSpy, msg);
    });
  });

  describe('logToFile()', () => {
    it('should create file if none exists', () => {
      expect(fs.existsSync(log_file_name)).to.equal(false);
      logToFile('Hello world!');
      expect(fs.existsSync(log_file_name)).to.equal(true);
    });

    it('should add to existing file', () => {
      const logFile = fs.createWriteStream(log_file_name, { flags: 'a' });
      logFile.write('Line 1');
      logFile.end();
      logToFile('2nd Line');
      expect(fs.readFileSync(log_file_name)).to.be('Line 1\n2nd Line');
    });

    it('should add any type provided into a JSON object', () => {
      logToFile('String');
      logToFile(['array']);
      logToFile({ thing: 'Object' });
      expect(fs.readFileSync(log_file_name)).to.be(
        'String\n["array"]\n{"thing":"Object"}',
      );
    });

    it('should trim file to 1000 lines', () => {});
  });
});
