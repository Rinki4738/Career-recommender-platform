import { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

export default function App() {
  const [step, setStep] = useState("home"); 
  const [mcqs, setMCQs] = useState([]);    
  const [score, setScore] = useState(0);

  return (
    <>
      {step === "home" && (
        <Home setStep={setStep} setMCQs={setMCQs} />
      )}

      {step === "quiz" && (
        <Quiz mcqs={mcqs} setStep={setStep} setScore={setScore} />
      )}

      {step === "result" && (
        <Result score={score} setStep={setStep} />
      )}
    </>
  );
}
