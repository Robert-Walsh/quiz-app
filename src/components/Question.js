import { useState } from "react"
import Button from "./Button"

function Question({ data, updateScore, questionNumber, index, currentQuestionIndex}){
    const [questionAnsweredCorrectly, setQuestionAnsweredCorrectly] = useState(false)
    const [questionAnswered, setQuestionAnswered] = useState(false)

    const { question, correctAnswer, incorrectAnswers } = data
    const { text } = question

    const shuffledAnswers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5)
    
    if(index !== currentQuestionIndex){
        return
    }

    const handleClick = (answer) => {
        setQuestionAnswered(true)

        if(questionAnswered){
            return  
        }

        if(answer === correctAnswer){
            setQuestionAnsweredCorrectly(true)
            updateScore(true)
        }
        else {
            setQuestionAnsweredCorrectly(false)
            updateScore(false)
        }
    }

    const renderedAnswers = shuffledAnswers.map((answer) => {
        return (
            <Button disabled={questionAnswered} onClick={() => handleClick(answer)} primary className="mr-2 w-full h-8 rounded-md shadow-xl drop-shadow-lg mt-2 h-auto">{answer}</Button>
        )
    })

    const renderedPostCorrect = (
        <div className="text-green-700 font-bold">
            Correct! The answer was: {correctAnswer}
        </div>
    )

    const renderedPostIncorrect = (
        <div className="text-red-700 font-bold">
            Incorrect! The correct answer was: {correctAnswer}
        </div>
    )

    return (
        <div>
            <h3 className="mb-3 font-bold">Question {questionNumber}</h3>
            <h3 className="mb-2">{text}</h3>
            {!questionAnswered && 
                <div className='flex flex-grid flex-col'>
                    {renderedAnswers}
                </div>
            }

            {questionAnswered && questionAnsweredCorrectly && renderedPostCorrect}
            {questionAnswered && !questionAnsweredCorrectly && renderedPostIncorrect}
        </div>
    )
}

export default Question