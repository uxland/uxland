import {nop} from '../nop';

describe('when invoking `nop` method', () => {
  it('should do nothing', () => {
    expect(nop()).toBeUndefined();
  });
});
