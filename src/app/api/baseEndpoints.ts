import { baseApi } from './baseApi';

export interface UploadFileResponse {
    url: string;
}

export const baseEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadFileResponse, FormData>({
        query: (formData) => ({
            method: 'POST',
            url: 'upload',
            body: formData  
        }) 
    })  
  }),
});

export const { useUploadFileMutation } = baseEndpoints;