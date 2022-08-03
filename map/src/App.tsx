import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import './styles/main.scss'

function App() {
  return (
    <div className='Title'>
      <h1 className='entry'>Map</h1>
      <div className='EntryForm'>
        <input className='seed' type="text"/>
        <QuestionCircleOutlined />
      </div>
      
    </div>
  );
}

export default App;
