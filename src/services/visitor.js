import request from '../utils/request';

export async function queryFetch(params) {
  return request('/api/visitor/fetch', {
    method: 'GET',
    body: params,
  })
}
