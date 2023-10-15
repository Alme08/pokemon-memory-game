import { useState } from "react"
import Game from "./Game";

function App(){
  const [level, setLevel] = useState(null);

  if (level !== null) {
    return(
      <Game level={level}/>
    )
  }

  return(
    <>
      <button onClick={() => setLevel(1)}>Easy</button>
      <button onClick={() => setLevel(2)}>Medium</button>
      <button onClick={() => setLevel(3)}>Hard</button>
    </>
  )
}
export default App