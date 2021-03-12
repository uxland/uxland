import {
  createAsyncActions,
  ENDED_SUFFIX,
  FAILED_SUFFIX,
  INVALIDATED_SUFFIX,
  STARTED_SUFFIX,
  SUCCEEDED_SUFFIX,
} from '../';
const action = 'MY-ACTION';
test('create async actions test', () => {
  const actions = createAsyncActions('MY-ACTION');
  expect(actions.ended).toEqual(action + ENDED_SUFFIX);
  expect(actions.started).toEqual(action + STARTED_SUFFIX);
  expect(actions.failed).toEqual(action + FAILED_SUFFIX);
  expect(actions.succeeded).toEqual(action + SUCCEEDED_SUFFIX);
  expect(actions.invalidated).toEqual(action + INVALIDATED_SUFFIX);
});
