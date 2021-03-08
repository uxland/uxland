import {toBase64} from '../src/file';
describe('Given a file', () => {
  it('it should return base64', async done => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });
    const result = await toBase64(file);
    expect(result).toEqual('data:text/plain;base64,Zm9v');
  });
});
