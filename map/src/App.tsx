import { QuestionCircleOutlined } from '@ant-design/icons';
import {Tooltip} from 'antd'
import { ChangeEvent, createRef, useEffect, useRef, useState } from 'react';


function App() {
  const [seed, setSeed] = useState("")
  const [game, setGame] = useState(false)
  const [update, setUpdate] = useState(false) 
  const boardRef = createRef<HTMLInputElement>()
  const containerRef  = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D |undefined| null>(containerRef.current?.getContext('2d'))

  //handle screen update and canvas refresh
  useEffect(() => {
        
    context?.clearRect(0,0,context.canvas.width,context.canvas.height)   
    setContext(containerRef.current && containerRef.current.getContext("2d"));  
   
  }, [context,])

  //handles input and window listeners
  useEffect(() => {
        
    window.addEventListener('keypress', e => handleInput(e), {once:true})             
    return () => window.removeEventListener('keypress' , e => handleInput(e))
      
},[update])



  //handles change between seed input state and canvas game state
  function toggleGame(event:any) {
    const board = boardRef.current
    const container = containerRef.current
    
    if(event?.code === "Enter"){
      board?.classList.toggle('is-game-opening',true)     
      setTimeout(() => {setGame(true)},5000)          
    }

    if(event === "endGame"){
      container?.classList.toggle('is-game-closing')   
         
      setTimeout(() => {
        setGame(false)        
      },5000)
    }
  }

  //handles change of seed input value
  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    setSeed(e.target.value)
  }

  //handles user input
  function handleInput(e: KeyboardEvent): any {
    console.log(e)
    setUpdate(!update)
  }

  return (
    <div className='Title'>
      <h1 className='entry' onClick={() =>toggleGame("endGame")}>Map</h1>
      {!game ?<div className='EntryForm'>        
        <input onKeyUp={(e) => toggleGame(e)} ref={boardRef} className='seed' type="number" maxLength={12} value={seed} onChange={(e) => {handleChange(e)}}/>              
        <Tooltip title="type in a random number to use as a seed. 1-12" placement='rightTop'>
           <QuestionCircleOutlined />
        </Tooltip>       
      </div>:
      <div>
        <canvas
          width={400}
          height={500}
          className={"game"}
          ref={containerRef}
        />
      </div>}     
    </div>
  );
}

export default App;


