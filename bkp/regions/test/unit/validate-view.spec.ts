import { validateView } from '../../src';

describe('when invoking `validate view` function', () => {
  it('should return true if factory is supplied', () => {
    expect(validateView({ factory: () => <any>{} })).toBe(true);
  });
  it('should raise error if factory is not a function', () => {
    expect(() => validateView({ factory: <any>true })).toThrow('factory property must be a function');
  });
});
