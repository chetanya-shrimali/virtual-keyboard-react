import Key from './components/Key';
import Keyboard from './components/KeyBoard';
import { useState } from 'react';

function App() {
  const [typedText, setTypedText] = useState("start");
  const textEvent = (value) => {
    setTypedText(value);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <textarea id="text-type" value={typedText} rows="4" cols="50" className="focus-visible">
        </textarea>
        <Keyboard textEvent={textEvent}></Keyboard>
      </header>
    </div>
  );
}

export default App;
