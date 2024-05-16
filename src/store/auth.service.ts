import { apiSlice } from "./apiSlice";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, { login: string, password: string }>({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: {...credentials}
      }),
    }),
    register: build.mutation<string, { login: string, password: string }>({
      query: (credentials) => ({
        url: 'user/register',
        method: 'POST',
        body: {...credentials}
      }),
    }),
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
} = authAPI;