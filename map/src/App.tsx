import { QuestionCircleOutlined } from '@ant-design/icons';
import {Tooltip} from 'antd'
import React from 'react';


function App() {
  return (
    <div className='Title'>
      <h1 className='entry'>Map</h1>
      <div className='EntryForm'>
        <input className='seed' type="text" maxLength={12}/>
        <Tooltip title="type in a random number to use as a seed. 1-12" placement='rightTop'>
           <QuestionCircleOutlined />
        </Tooltip>       
      </div>
      
    </div>
  );
}

export default App;
