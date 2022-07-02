import { request } from '@umijs/max';

const Host = 'http://127.0.0.1:7001'

export async function computeData(
  params: { data: any },
  options?: { [key: string]: any },
) {
  return request<any>(`${Host}/api/computeData`, {
    method: 'POST',
    data: params.data,
    ...(options || {}),
  });
}