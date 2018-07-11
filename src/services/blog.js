import { stringify } from 'qs';
import request from '../utils/request';

export async function category(params) {
  return request('/api/blog/category', {
    body: params,
  });
}

export async function categorySave(params) {
  return request('/api/blog/category-save', {
    method: 'POST',
    body: params,
  })
}

export async function categoryRemove(params) {
  return request(`/api/blog/category-remove?${stringify(params)}`);
}


export async function subCategory(params) {
  return request('/api/blog/sub-category', {
    body: params,
  });
}

export async function subCategorySave(params) {
  return request('/api/blog/sub-category-save', {
    method: 'POST',
    body: params,
  })
}

export async function subCategoryRemove(params) {
  return request(`/api/blog/sub-category-remove?${stringify(params)}`);
}


export async function article() {
  return request('/api/blog/article');
}

export async function articleSave() {
  return request('/api/blog/article-save');
}
