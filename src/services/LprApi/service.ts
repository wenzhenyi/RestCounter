import { request } from '@umijs/max';

const Host = 'http://127.0.0.1:8889'

export async function getLPRList(
  params: {},
  options?: { [key: string]: any },
) {
  return request<any>(`${Host}/api/getLPR`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}