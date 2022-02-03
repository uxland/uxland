import {expect} from '@open-wc/testing';
import {nop} from '../nop';

describe('when invoking `nop` method', () => {
  it('should do nothing', () => {
    expect(nop()).to.be.undefined;
  });
});
