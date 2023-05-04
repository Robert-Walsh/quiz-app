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

        if(answer == correctAnswer){
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
            <Button disabled={questionAnswered} onClick={() => handleClick(answer)}>{answer}</Button>
        )
    })

    const renderedPostCorrect = (
        <div>
            Correct! The answer was: {correctAnswer}
        </div>
    )

    const renderedPostIncorrect = (
        <div>
            Incorrect! The correct answer was: {correctAnswer}
        </div>
    )

    return (
        <div>
            <h3>Question {questionNumber}</h3>
            <h3>{text}</h3>
            {!questionAnswered && 
                <div>
                    {renderedAnswers}
                </div>
            }

            {questionAnswered && questionAnsweredCorrectly && renderedPostCorrect}
            {questionAnswered && !questionAnsweredCorrectly && renderedPostIncorrect}


        </div>
    )
}

export default Question