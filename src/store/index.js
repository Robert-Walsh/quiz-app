import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { quizApi } from './apis/quizApi'

export const store = configureStore({
    reducer: {
        [quizApi.reducerPath]: quizApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(quizApi.middleware)
    }
}) 

setupListeners(store.dispatch)

export { useGetQuestionsQuery } from './apis/quizApi'