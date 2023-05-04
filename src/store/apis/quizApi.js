import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//DEV ONLY!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}


const quizApi = createApi({
    reducerPath: 'quiz',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://the-trivia-api.com/v2',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
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