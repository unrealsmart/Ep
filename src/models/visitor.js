import { queryFetch } from '../services/visitor';

export default {
  namespace: 'visitor',
  
  state: {
    current: 0,
    currentYoy: 0,
    total: 0,
    lists: [],
    loading: false,
  },
  
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryFetch, payload);
      yield put({
        type: 'save',
        payload: response || {},
      });
      if (callback) callback();
    },
  },
  
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        current: 0,
        currentYoy: 0,
        total: 0,
        lists: [],
      };
    },
  },
}
