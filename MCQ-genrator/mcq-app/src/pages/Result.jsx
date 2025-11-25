export default function Result({ score, setStep }) {
  return (
    <div>
      <h1>Your Score: {score}</h1>
      <button onClick={() => setStep("home")}>Generate Again</button>
    </div>
  );
}
