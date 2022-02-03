import {expect} from '@open-wc/testing';
import {promiseAll} from '../promise-all';

describe('promise all fixture', () => {
  it('should be defined', () => {
    expect(promiseAll).to.not.be.undefined;
  });
});
