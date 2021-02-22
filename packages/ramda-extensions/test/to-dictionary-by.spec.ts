import {toDictionary} from '../src/to-dictionary';
describe('to dictionary by fixture', () => {
  it('should return an object using "id" of each item as key', () => {
    const input: any = [
      {id: '1', foo: 'bar'},
      {id: 2, qux: 'quux'},
    ];
    expect(toDictionary(input)).toEqual({1: input[0], 2: input[1]});
  });
});
