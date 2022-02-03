import {expect} from '@open-wc/testing';
import {toPath} from '../to-path';
describe('toPath test suite', () => {
  it('should return an array of paths when argument is an string path', () => {
    expect(toPath('foo.bar.baz')).to.deep.equal(['foo', 'bar', 'baz']);
  });
  it('should return same input if an array is passed as argument', () => {
    const path = ['foo', 'bar', 'baz'];
    expect(toPath(path)).to.deep.equal(path);
  });
});
