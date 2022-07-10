import { request } from '@umijs/max';
import { POSTHOST } from '../common';

export async function computeData(
  params: { data: any },
  options?: { [key: string]: any },
) {
  return request<any>(`${POSTHOST}/api/computeData`, {
    method: 'POST',
    data: params.data,
    ...(options || {}),
  });
}

export async function downloadTemplate(
  params?: {},
  options?: { [key: string]: any },
) {
  return request<any>(`${POSTHOST}/api/downloadTemplateFile`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}