import {useContext} from "react";
import { DataContext } from "../App";
import QuestionData from "../data/QuestionsData"


const Score = () => {
  const { score, setAppState, setScore } = useContext(DataContext);

  const restartApp = () => {
    setScore(0);
    setAppState("menu");
  }

  return (
    <div className="score">
        <h1>สรุปผลคะแนน</h1>
      <h2>{score} / {QuestionData.length}</h2>
        <button onClick={restartApp}>ทำแบบข้อสอบอีกครั้ง</button>
    </div>
  )
}

export default Score
