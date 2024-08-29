import { stub, assert } from 'sinon';
import { addLog } from '../../src/services/storage';
import * as sqlite3 from 'sqlite3';
// import { expect } from 'chai';

describe('createTables()', () => {
});

describe('addLog()', () => {
  it('should insert a log entry into the database', () => {
    const mockDatabase = {
      run: stub(),
    };
    stub(sqlite3.Database).returns(mockDatabase);

    const logObject = { message: 'Test message' };
    addLog(logObject);

    assert.calledOnce(mockDatabase.run);
    // assert.calledWith(mockDatabase.run,
    //   expect.stringContaining('INSERT INTO logs'),
    //   expect.arrayContaining([expect.any(), logObject]),
    //   expect.any(),
    // );
  });
});

describe('checkRowCount', () => {
});