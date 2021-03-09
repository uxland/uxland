import {toBase64} from '../src/file';

describe('Given a file', () => {
  it('should return base64 of that file', async done => {
    const file = new File(['foo'], 'foo.txt', {type: 'text/plain'});
    const base64 = await toBase64(file);
    expect(base64).toEqual('data:text/plain;base64,Zm9v');
    done();
  });
});
