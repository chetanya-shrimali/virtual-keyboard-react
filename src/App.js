import './App.css';
import Keyboard from './components/KeyBoard';
import { useState } from 'react';

function App() {
  const [typedText, setTypedText] = useState("");
  const textEvent = (value) => {
    setTypedText(value);
  }
  
  return (
    <div className="App">
      <textarea id="text-type"  placeholder="Type here..." value={typedText} rows="5" cols="133" readOnly autoFocus>
      </textarea>
      <Keyboard textEvent={textEvent} typedText={typedText}></Keyboard>
    </div>
  );
}

export default App;
