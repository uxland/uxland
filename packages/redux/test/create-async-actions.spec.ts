import {expect} from '@open-wc/testing';
import {
  createAsyncActions,
  ENDED_SUFFIX,
  FAILED_SUFFIX,
  INVALIDATED_SUFFIX,
  STARTED_SUFFIX,
  SUCCEEDED_SUFFIX,
} from '../';
const action = 'MY-ACTION';
it('create async actions test', () => {
  const actions = createAsyncActions('MY-ACTION');
  expect(actions.ended).to.deep.equal(action + ENDED_SUFFIX);
  expect(actions.started).to.deep.equal(action + STARTED_SUFFIX);
  expect(actions.failed).to.deep.equal(action + FAILED_SUFFIX);
  expect(actions.succeeded).to.deep.equal(action + SUCCEEDED_SUFFIX);
  expect(actions.invalidated).to.deep.equal(action + INVALIDATED_SUFFIX);
});
