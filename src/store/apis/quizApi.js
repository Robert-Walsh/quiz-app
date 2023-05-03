import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const quizApi = createApi({
    reducerPath: 'quiz',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://the-trivia-api.com/v2'
    }),
    endpoints(builder){
        return {
            getQuestions: builder.query({
                query: () => {
                    return {
                        url: '/questions',
                        method: 'GET'
                    }
                }
            })
        }
    }
})

export const { useGetQuestionsQuery } = quizApi
export { quizApi }