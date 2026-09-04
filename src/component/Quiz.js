import QuestionData from "../data/QuestionsData"
import { useState, useContext } from "react"
import { DataContext } from "../App"

const Quiz = () => {
    const [current, setCurrent] = useState(0)
    const [selectChoice, setSelectChoice] = useState("") // เก็บตัวเลือกของข้อปัจจุบัน
    const [userAnswers, setUserAnswers] = useState({}) // เก็บคำตอบทั้งหมด { 0: "A", 1: "C" }
    const { setScore, setAppState } = useContext(DataContext)

    // ฟังก์ชันเลือกคำตอบ
    const handleSelectChoice = (choice) => {
        setSelectChoice(choice)
        setUserAnswers({
            ...userAnswers,
            [current]: choice
        })
    }

    // ฟังก์ชันย้อนกลับ
    const prevQuestion = () => {
        if (current > 0) {
            const prevIndex = current - 1
            setCurrent(prevIndex)
            setSelectChoice(userAnswers[prevIndex] || "") // ดึงคำตอบเดิมมาแสดง
        }
    }

    
    const nextQuestion = () => {
        if (current === QuestionData.length - 1) {
           
            let totalScore = 0
            QuestionData.forEach((item, index) => {
                if (userAnswers[index] === item.answer) {
                    totalScore += 1
                }
            })
            setScore(totalScore)
            setAppState("score")
        } else {
            const nextIndex = current + 1
            setCurrent(nextIndex)
            setSelectChoice(userAnswers[nextIndex] || "") 
        }
    }

    return (
        <div className="quiz">
            <h1>{QuestionData[current].question}</h1>
            
            {/* รายการช้อยส์คำตอบ */}
            <div className="choices">
                <button 
                    className={selectChoice === "A" ? "selected" : ""} 
                    onClick={() => handleSelectChoice("A")}
                >
                    {QuestionData[current].A}
                </button>
                <button 
                    className={selectChoice === "B" ? "selected" : ""} 
                    onClick={() => handleSelectChoice("B")}
                >
                    {QuestionData[current].B}
                </button>
                <button 
                    className={selectChoice === "C" ? "selected" : ""} 
                    onClick={() => handleSelectChoice("C")}
                >
                    {QuestionData[current].C}
                </button>
                <button 
                    className={selectChoice === "D" ? "selected" : ""} 
                    onClick={() => handleSelectChoice("D")}
                >
                    {QuestionData[current].D}
                </button>
            </div>

            <p>{`${current + 1} / ${QuestionData.length}`}</p>

            {/* ปุ่มนำทาง (ย้อนกลับ / ถัดไป) */}
            <div className="nav-buttons">
                <button onClick={prevQuestion} disabled={current === 0}>
                    ย้อนกลับ
                </button>
                <button onClick={nextQuestion} disabled={!selectChoice}>
                    {current === QuestionData.length - 1 ? "ส่งคำตอบ" : "ถัดไป"}
                </button>
            </div>
        </div>
    )
}

export default Quiz