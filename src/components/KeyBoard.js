import PropTypes from 'prop-types';
import Key from './Key';
import { useState } from 'react';
import data from '../data.json';

const Keyboard = ({typedText, textEvent}) => {
  const [shiftTriggered, setShiftTriggered] = useState(
    false
  );
  
  const [capsTriggered, setCapsTriggered] = useState(
    false
  );

  const [keyStructure, setKeyStructure] = useState(
    data
  );

  // generate key values
  const generateKeys = (data, shiftStatus, capsStatus) => {
    return data.map((key)=> {
      let value = '';
      if (shiftStatus) {
        value = (key.type !== 'func') ? key.values.secondary || key.values.primary.toUpperCase() : key.values.primary;
      } else if (capsStatus) {
        value = (key.type === 'alphabet') ? key.values.primary.toUpperCase() : key.values.primary; 
      } else {
        value = key.values.primary;
      }
      return value;
    })
  }

  const [keys, setKeys] = useState(
    generateKeys(keyStructure, false, false)
  );


  // generate random keyboard structure
  const randomiseKeyStructure = () => {
    let updatedStructure = [];
    let positions = [];
    while(keyStructure.length!=positions.length) {
      var randomPosition = Math.floor(Math.random()*100%52)
      let value = keyStructure[randomPosition];
      if (positions.indexOf(randomPosition) === -1) {
        updatedStructure.push(value);
        positions.push(randomPosition);
      }
    }
    return updatedStructure;
  }

  const keyActions = (value) => {
    let newKeys;
    switch (value) {
      case 'shift':
        let shiftChangeTriggered;
        // change reference so that react knows state has changed
        if (shiftTriggered) {
          shiftChangeTriggered = false;
        } else {
          shiftChangeTriggered = true;
        }
        setShiftTriggered(shiftChangeTriggered);
        newKeys = generateKeys(keyStructure, shiftChangeTriggered);
        setKeys(newKeys);
        break;
      case 'caps':
        // change reference so that react knows state has changed
        let capsChangeTriggered;
        if (capsTriggered) {
          capsChangeTriggered = false;
        } else {
          capsChangeTriggered = true;
        }
        setCapsTriggered(capsChangeTriggered);
        newKeys = generateKeys(keyStructure, shiftTriggered,capsChangeTriggered);
        setKeys(newKeys);
        break;
      case 'space':
        typedText = typedText + ' ';
        break;
      case 'enter':
        typedText = typedText + '\n';
        break;
      case 'delete':
        if (typedText.slice(-2) === '\n') {
          typedText = typedText.slice(0,typedText.length-2);
        } else {
          typedText = typedText.slice(0,typedText.length-1);
        }
        break;
      default:
        if (capsTriggered) {
          typedText = typedText + value.toUpperCase();
        } else {
          typedText = typedText + value;
        }
        // change reference so that react knows state has changed
        let setShiftToFalse = false;
        setShiftTriggered(setShiftToFalse);
        let newStructure = randomiseKeyStructure()
        newKeys = generateKeys(newStructure, setShiftToFalse, capsTriggered);
        setKeyStructure(newStructure);
        setKeys(newKeys);
    }
    textEvent(typedText);
  }

  const onClickEvent = (value) => {
    keyActions(value);
  }

  return (
    <div className="keyboard-container">
      {keys ? keys.map((elem,i) => {
          return <span><Key key={i} keyItem={elem} index={i} onClick={onClickEvent}></Key></span>;
      }): ''}
    </div>
  )
};

Keyboard.propTypes = {
  typedText: PropTypes.string,
  textEvent: PropTypes.func
};
export default Keyboard;
