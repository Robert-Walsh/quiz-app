import QuizManager from "./pages/QuizManager"

function App() {
    return (
        <div className="h-screen place-items-center bg-orange-100 flex flex-col justify-center">
            <img src={'/quizNinja.png'} className="mb-6" alt="QuizNinja Logo"/>
            <QuizManager/>
        </div>

    )
}

export default App