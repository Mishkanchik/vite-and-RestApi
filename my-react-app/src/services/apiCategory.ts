import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:4096/api/" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // ✅ GET (read)
    getCategories: builder.query({
      query: () => "categories/",
      providesTags: ["Category"],
    }),

    // ✅ POST (create)
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "categories/",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    // ✅ PUT (update)
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `categories/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // ✅ DELETE
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}/`,
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
