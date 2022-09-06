import { QuestionCircleOutlined } from '@ant-design/icons';
import {Tooltip} from 'antd'
import React, { createRef, useState } from 'react';


function App() {
  const [game, setGame] = useState(false)
  const boardRef = createRef<HTMLInputElement>()
  const containerRef  = createRef<HTMLCanvasElement>()

  function toggleGame(event:any) {
    const board = boardRef.current
    const container = containerRef.current
    
    if(event?.code === "Enter"){
      board?.classList.toggle('is-game-opening',true)        

      setTimeout(() => {setGame(true)},5000)          
    }

    if(event === "endGame"){
      container?.classList.toggle('is-game-closing')        
      setTimeout(() => {setGame(false)},5000)
    }
  }

  return (
    <div className='Title'>
      <h1 className='entry' onClick={() =>toggleGame("endGame")}>Map</h1>
      {!game ?<div className='EntryForm'>        
        <input onKeyUp={(e) => toggleGame(e)} ref={boardRef} className='seed' type="number" maxLength={12}/>              
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
