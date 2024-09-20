import { baseApi } from "./baseApi";

const CATEGORY_URL = "/admin/event-categories";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<any, void>({
      query: () => ({
        url: CATEGORY_URL,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    addCategory: build.mutation({
      query: (data) => ({
        url:`/admin/event-categories`,
        method: "POST",
        data : {
            "title": data.title,
            "parent_id": ""
        },
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: build.mutation({
      query: ({ id, categoryData }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        data: {
            "title": categoryData.title,
            "parent_id": ""
        },
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
