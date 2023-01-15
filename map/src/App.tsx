import { QuestionCircleOutlined } from '@ant-design/icons';
import {Tooltip} from 'antd'
import { ChangeEvent, createRef, useEffect, useRef, useState } from 'react';
import Board from './components/board'


function App() {
  const [seed, setSeed] = useState("")
  const [game, setGame] = useState(false)
  const [grid, setGrid] = useState<Grid[]>([])
  const [update, setUpdate] = useState(false) 
  const boardRef = createRef<HTMLInputElement>()
  const containerRef  = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D |undefined| null>(containerRef.current?.getContext('2d'))

  //Intial SETUP
  function gridSetup() {
    let wNum = 500 / 40 -1
    let hNum = 500 / 40 - 1
    let start : Grid[] = []

    for(let ii = 0; ii++, ii<=hNum;){

      for(let i = 0; i++, i<=wNum;){

        let square : Grid = {
          corX: 40 * i ,
          corY: 40 * ii,
          colour: "red"
        }

        start.push(square)
      }
    }
    return start
  }
  //handle screen update and canvas refresh
  useEffect(() => {
        
    context?.clearRect(0,0,context.canvas.width,context.canvas.height)   
    Board(context? context:undefined, grid)
    setContext(containerRef.current && containerRef.current.getContext("2d"));  
   
  }, [context, grid])

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
      setTimeout(() => {
        setGame(true)
        setGrid(gridSetup())
      },5000)          
    }

    if(event === "endGame"){
      container?.classList.toggle('is-game-closing')   
         
      setTimeout(() => {
        setSeed("")
        setGame(false)        
      },5000)
    }
  }

  //handles change of seed input value
  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    if(e.target.value.length <= 12) {
      setSeed(e.target.value)
    }
    
  }

  //handles user input
  function handleInput(e: KeyboardEvent): any {       
    setUpdate(!update)
  }

  return (
    <div className='Title'>
      <h1 className='entry' onClick={() =>toggleGame("endGame")}>Map</h1>
      {!game ?<div className='EntryForm'>        
        <input onKeyUp={(e) => toggleGame(e)} ref={boardRef} className='seed' type="number" value={seed} onChange={(e) => {handleChange(e)}}/>              
        <Tooltip title="type in a random number to use as a seed. 1-12" placement='rightTop'>
           <QuestionCircleOutlined />
        </Tooltip>       
      </div>:
      <div>
        <canvas
          width={500}
          height={500}
          className="game"
          ref={containerRef}
        />
      </div>}     
    </div>
  );
}

export default App;


