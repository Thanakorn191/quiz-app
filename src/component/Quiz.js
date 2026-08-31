import QuestionData from "../data/QuestionsData"
import { useState, useContext } from "react"
import { DataContext } from "../App"

const Quiz = () => {
    const [current, setCurrent] = useState(0)
    const { score, setScore, setAppState } = useContext(DataContext)

    // ฟังก์ชันตรวจคำตอบและส่งตัวเลือกที่กดเข้ามาตรวจทันที
    const checkAnswer = (choice) => {
        // ตรวจสอบว่าคำตอบตรงกับ answer ใน QuestionsData หรือไม่
        if (choice === QuestionData[current].answer) {
            setScore(score + 1)
        }
        nextQuestion()
    }

    const nextQuestion = () => {
        if (current === QuestionData.length - 1) {
            setAppState("score")
        } else {
            setCurrent(current + 1)
        }
    }

    return (
        <div className="quiz">
            <h1>{QuestionData[current].question}</h1>
            <div className="choices">
                {/* ส่งชื่อตัวเลือก "A", "B", "C", "D" (หรือตัวแปรข้อความ ให้ตรงกับค่า answer ใน QuestionsData.js) */}
                <button onClick={() => checkAnswer("A")}>{QuestionData[current].A}</button>
                <button onClick={() => checkAnswer("B")}>{QuestionData[current].B}</button>
                <button onClick={() => checkAnswer("C")}>{QuestionData[current].C}</button>
                <button onClick={() => checkAnswer("D")}>{QuestionData[current].D}</button>
            </div>
            <p>{`${current + 1} / ${QuestionData.length}`}</p>
        </div>
    )
}

export default Quiz