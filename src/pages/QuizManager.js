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
        <div>
            <h3>Current Score: {currentScore}/10</h3>
            <div>
                {content}
            </div>
        </div>
    )

    const gameOverContent = (
        <div>
            <h3>
                The game is over! You scored {currentScore} out of 10! 
            </h3>
            <Button primary onClick={handlePlayAgain}>
                Play Again? 
            </Button>
            
        </div>
    )

    return (
        <div>
            {isGameOver ? gameOverContent : gameInProgressContent}
        </div>
    )
}

export default QuizManager