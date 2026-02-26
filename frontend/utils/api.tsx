import api from '@/config/axiosConfig';
import { ApiDetail } from '@/interface/common/ApiDetail';

export async function apiCall<T>(apiDetail: ApiDetail, request: Record<any, any>): Promise<T> {
  const response = await api({
    method: apiDetail.method || 'POST',
    url: apiDetail.path,
    data: request,
  });
  return response.data;
}

export async function fetchApi<T>(apiDetail: ApiDetail, request: Record<any, any>): Promise<T> {
  return apiCall<T>(apiDetail, request);
}

export async function fetchData<T>(apiDetail: ApiDetail, request: Record<any, any>): Promise<T> {
  return apiCall<T>(apiDetail, request);
}

export async function submitData<T>(apiDetail: ApiDetail, request: Record<any, any>): Promise<T> {
  return apiCall<T>(apiDetail, request);
}

export async function downloadFile(apiDetail: ApiDetail, request: Record<any, any>): Promise<Blob> {
  const response = await api({
    method: 'POST',
    url: apiDetail.path,
    data: request,
    responseType: 'blob',
  });
  return response.data; // This will be a Blob
}