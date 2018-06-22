import {
  queryFetch,
  queryLists,
  setRead,
  exportExcel,
} from '../services/message';

export default {
  namespace: 'message',
  
  state: {
    read: 0,
    unRead: 0,
    todayCount: 0,
    todayCountYoy: 0,
    total: 0,
    lists: { data: [] },
    loading: false,
  },
  
  effects: {
    *fetch( { callback }, { call, put }) {
      const response = yield call(queryFetch);
      yield put({
        type: 'save',
        payload: response || {},
      });
      if (callback) callback();
    },
    *fetchLists({ payload, callback }, { call, put }) {
      const response = yield call(queryLists, payload);
      yield put({
        type: 'saveLists',
        payload: response.data || {},
      });
      if (callback) callback(response.data);
    },
    *setRead({ payload, callback }, { call }) {
      const response = yield call(setRead, payload);
      if (callback) callback(response.status);
    },
    *exportExcel({ payload, callback }, { call }) {
      const response = yield call(exportExcel, payload);
      if (callback) callback(response);
    },
  },
  
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveLists(state, { payload }) {
      return {
        ...state,
        ...{
          lists: payload,
        },
      };
    },
    clear() {
      return {
        read: 0,
        unRead: 0,
        todayCount: 0,
        todayCountYoy: 0,
        total: 0,
        lists: { data: [] },
      };
    },
  },
}
