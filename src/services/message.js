import request from '../utils/request';

export async function queryFetch() {
  return request('/api/message/fetch');
}

export async function queryLists(params) {
  return request('/api/message/lists', {
    method: 'GET',
    body: params,
  });
}

export async function setRead(params) {
  return request('/api/message/setRead', {
    method: 'POST',
    body: params,
  });
}

export async function exportExcel(params) {
  return request('/api/message/export', {
    method: 'POST',
    body: params,
  });
}
