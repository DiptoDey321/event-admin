import { baseApi } from "./baseApi";
const AUTH_URL = "/admin/users";
const REPORT_URL = "/admin/reports";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
        requiresAuth: false,
      }),
      invalidatesTags: ["user"],
    }),

    getDashboardTotalCount: build.query<any, void>({
      query: () => ({
        url: `${REPORT_URL}/dashboard-total-count`,
        method: "GET",
      }),
      providesTags: ["DashboardTotalCount"],
    }),
  }),
});

export const { useUserLoginMutation, useGetDashboardTotalCountQuery } = authApi;
