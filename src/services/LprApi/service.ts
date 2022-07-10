import { request } from '@umijs/max';
import { POSTHOST } from '../common';

export async function getLPRList(
  params: {},
  options?: { [key: string]: any },
) {
  return request<any>(`${POSTHOST}/api/getLPR`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateLPR(
  params: { data: any },
  options?: { [key: string]: any },
) {
  return request<any>(`${POSTHOST}/api/uploadLPR`, {
    method: 'POST',
    data: params.data,
    ...(options || {}),
  });
}
