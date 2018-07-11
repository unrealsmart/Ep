import {
  // category
  category,
  categorySave,
  categoryRemove,
  
  // sub category
  subCategory,
  subCategorySave,
  subCategoryRemove,
  
  // article
  article,
  articleSave,
} from '../services/blog';

export default {
  namespace: 'blog',
  
  state: {
    category: [],
    subCategory: [],
    article: [],
  },
  
  effects: {
    // category
    *category({ callback }, { call, put }) {
      const response = yield call(category);
      yield put({
        type: 'save',
        stateKey: 'category',
        payload: response || [],
      });
      if (callback) callback();
    },
    *categorySave({ payload, callback }, { call, put }) {
      const response = yield call(categorySave, payload);
      yield put({
        type: 'push',
        stateKey: 'category',
        payload: response.status === 'success' ? response.data : [],
      });
      if (callback) callback(response);
    },
    *categoryRemove({ payload, callback }, { call, put }) {
      const response = yield call(categoryRemove, payload);
      yield put({
        type: 'remove',
        stateKey: 'category',
        payload: response.status === 'success' ? response.data : false,
      })
      if (callback) callback();
    },
    
    // sub category
    *subCategory({ callback }, { call, put }) {
      const response = yield call(subCategory);
      yield put({
        type: 'save',
        stateKey: 'subCategory',
        payload: response || [],
      });
      if (callback) callback();
    },
    *subCategorySave({ payload, callback }, { call, put }) {
      const response = yield call(subCategorySave, payload);
      yield put({
        type: 'push',
        stateKey: 'subCategory',
        payload: response.status === 'success' ? response.data : [],
      });
      if (callback) callback(response);
    },
    *subCategoryRemove({ payload, callback }, { call, put }) {
      const response = yield call(subCategoryRemove, payload);
      yield put({
        type: 'remove',
        stateKey: 'subCategory',
        payload: response.status === 'success' ? response.data : false,
      })
      if (callback) callback();
    },
    
    // article
    *article({ callback }, { call, put }) {
      const response = yield call(article);
      yield put({
        type: 'reducersArticleSave',
        payload: response || [],
      });
      if (callback) callback();
    },
  },
  
  
  reducers: {
    // category & sub category: save & push & remove
    save(state, { stateKey, payload }) {
      const newData = payload.length && payload.map(item => {
        return {
          ...item,
          ...{
            key: `KEY-${item.id}`,
            editable: false,
          },
        }
      });
      const newDataObject = stateKey === 'category' ? {
        category: newData,
      } : {
        subCategory: newData,
      };
      return {
        ...state,
        ...newDataObject,
      };
    },
    push(state, { stateKey, payload }) {
      let isPush = true;
      const data = stateKey === 'category' ? state.category : state.subCategory;
      const newData = data.map(item => {
        if (item.id === payload.id) {
          isPush = false;
          return {
            ...payload,
            ...{
              key: `KEY-${payload.id}`,
              editable: true,
            },
          };
        }
        return item;
      })
      if (payload && isPush) {
        newData.push({
          ...payload,
          ...{
            key: `KEY-${payload.id}`,
            editable: false,
          },
        });
      }
      const newDataObject = stateKey === 'category' ? {
        category: newData,
      } : {
        subCategory: newData,
      };
      return {
        ...state,
        ...newDataObject,
      };
    },
    remove(state, { stateKey, payload }) {
      const data = stateKey === 'category' ? state.category : state.subCategory;
      const newData = data.filter(item => item.key !== payload);
      const newDataObject = stateKey === 'category' ? {
        category: newData,
      } : {
        subCategory: newData,
      };
      return {
        ...state,
        ...newDataObject,
      };
    },
    
    // article: save & push & remove
    reducersArticleSave(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
