import { useState } from 'react'
import { useGetQuestionsQuery } from "../store"
import Question from '../components/Question'
import Button from '../components/Button'

const TOTAL_QUIZ_QUESTIONS = 10

function QuizManager() {
    const { data, isFetching, error, refetch } = useGetQuestionsQuery()
    const [ currentScore, setCurrentScore ] = useState(0)
    const [ totalAnsweredQuestions, setTotalAnsweredQuestions ] = useState(0)
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)

    const pause = (duration) => {
        return new Promise((resolve) => {
            setTimeout(resolve, duration)
        })
    }

    const handleUpdateScore = async (answeredCorrectly) => {
        if(answeredCorrectly){
            setCurrentScore(currentScore + 1)
        }
        await pause(1000)
        setTotalAnsweredQuestions(totalAnsweredQuestions + 1)

        await pause(1000)
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    const handlePlayAgain = () => {
        refetch()
        setCurrentScore(0)
        setTotalAnsweredQuestions(0)
        setCurrentQuestionIndex(0)
    }

    let content

    if(isFetching){
        content = (
            <div>
                Fetching your questions!
            </div>
        )
    }
    else if(error){
        content = (
            <div>
                Something went wrong fetching the questions...
            </div>
        )
    }
    else {
        content = data.map((question, index) => {
            return (
                <Question key={question.id} data={question} updateScore={handleUpdateScore} questionNumber={index + 1} index={index} currentQuestionIndex={currentQuestionIndex}/>
            )
        })
    }

    const isGameOver = totalAnsweredQuestions === TOTAL_QUIZ_QUESTIONS

    const gameInProgressContent = (
        <div className='flex flex-col justify-center mx-4 my-4'>
            <h3 className="mb-6 flex flex-row">Current Score: <div className='ml-2 font-bold'>{currentScore}/10</div></h3>
            <div className=''>
                {content}
            </div>
        </div>
    )

    const gameOverContent = (
        <div className='flex flex-col items-center justify-center mt-16'>
            <h3>
                The game is over! You scored {currentScore} out of 10! 
            </h3>
            <Button primary onClick={handlePlayAgain} className='mr-2 mb-12 w-32 h-16 rounded-md shadow-xl drop-shadow-lg mt-4'>
                Play Again? 
            </Button>
        </div>
    )

    return (
        <div className="bg-stone-100 border-solid border-2 border-slate-600 rounded-lg shadow-2xl h-auto w-96 relative">
            <div>
                {isGameOver ? gameOverContent : gameInProgressContent}
            </div>
        </div>
    )
}

export default QuizManager