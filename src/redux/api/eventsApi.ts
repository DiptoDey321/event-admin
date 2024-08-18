import { baseApi } from "./baseApi";
const EVENTS_URL = "/admin/events";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchEvents: build.query({
      query: () => ({
        url: `${EVENTS_URL}`,
        method: "GET",
        requiresAuth: true,
      }),
      providesTags: ["events"],
    }),

    fetchApprovedEvents: build.query({
      query: () => ({
        url: `${EVENTS_URL}?event_type=approved`,
        method: "GET",
        requiresAuth: true,
      }),
      providesTags: ["events"],
    }),

    updateEventStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `${EVENTS_URL}/status-action/${id}`,
        method: "PUT",
        data: { event_status: status },
      }),
      invalidatesTags: ["events"],
    }),

    getSaleOrder: build.query({
      query: (eventId) => ({
        url: `/admin/reports/sale-order/${eventId}`,
        method: "GET",
      }),
      providesTags: ["SaleOrder"],
    }),

    deleteEvent: build.mutation<void, string>({
      query: (id) => ({
        url: `${EVENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
  }),
});

export const { useFetchEventsQuery, useUpdateEventStatusMutation , useFetchApprovedEventsQuery , useGetSaleOrderQuery } = authApi;
