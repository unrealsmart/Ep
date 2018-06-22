import { queryMenu } from '../services/menu';

export default {
  namespace: 'menu',
  
  state: {
    lists: [],
  },
  
  effects: {
    *fetch({ callback }, { call, put }) {
      const response = yield call(queryMenu);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...{
          lists: payload,
        },
      };
    },
  },
}
