import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Board", "Task"],
    endpoints: (builder) => ({
        // Auth
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials,
            }),
        }),
        getUser: builder.query({
            query: () => '/auth/me'
        }),
        //Boards
        getBoards: builder.query({
            query: () => "/boards",
            providesTags: ["Board"],
        }),
        createBoard: builder.mutation({
            query: (board) => ({
                url: "/boards",
                method: "POST",
                body: board,
            }),
            invalidatesTags: ["Board"],
        }),
        deleteBoard: builder.mutation({
            query: (id) => ({
                url: `/boards/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Board"],
        }),

        // Tasks
        getTasks: builder.query({
            query: (boardId) => `/tasks/${boardId}`,
            providesTags: (result, error, boardId) => [{ type: "Task", id: boardId }],
        }),
        createTask: builder.mutation({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: (result, error, { boardId }) => [{ type: "Task", id: boardId }],
        }),
        updateTask: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: patch,
            }),
            // Optimistic Update
            async onQueryStarted({ id, boardId, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getTasks", boardId, (draft) => {
                        const task = draft.find((t) => t._id === id);
                        if (task) {
                            Object.assign(task, patch);
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetBoardsQuery,
    useCreateBoardMutation,
    useDeleteBoardMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useGetUserQuery,
} = apiSlice;
