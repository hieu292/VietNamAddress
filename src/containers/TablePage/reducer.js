import { Record } from 'immutable';
import ActionTypes from './constants';

export const Link = new Record({
  link: null,
});

const exportCSVReducer = (state = new Link(), { payload, type }) => {
  switch (type) {
    case ActionTypes.EXPORT_CSV_SUCCESS:
      return state.set('link', payload.link);
    default:
      return state;
  }
};

export default exportCSVReducer;
