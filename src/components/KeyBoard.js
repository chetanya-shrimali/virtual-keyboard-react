import PropTypes from 'prop-types';
import Key from './Key';
import { useState } from 'react';
import data from '../data.json';

const Keyboard = ({title, typedText, textEvent}) => {
  const [shiftTriggered, setShiftTriggered] = useState(
    false
  );
  
  const [capsTriggered, setCapsTriggered] = useState(
    false
  );

  const [keyStructure, setKeyStructure] = useState(
    data
  );

  const generateKeys = () => {
    return keyStructure.map((key)=> {
      let value = '';
      if (shiftTriggered) {
        value = (key.type !== 'func') ? key.values.secondary || key.values.primary.toUpperCase() : key.values.primary;
      } else if (capsTriggered) {
        value = (key.type === 'alphabet') ? key.values.primary.toUpperCase() : key.values.primary; 
      } else {
        value = key.values.primary;
      }
      return value;
    })
  }

  const [keys, setKeys] = useState(
    generateKeys()
  );

  // 1) randomise key implementation
  // 2) check what all are function keys
  // 3) fix all reload stuff
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
    switch (value) {
      case 'shift':
        setShiftTriggered(!shiftTriggered);
        setKeys(generateKeys());
        break;
      case 'caps':
        setCapsTriggered(!capsTriggered);
        setKeys(generateKeys());
        break;
      case 'space':
        typedText = typedText + ' ';
        break;
      case 'enter':
        typedText = typedText + '\n';
        break;
      case 'delete':
        typedText = typedText.slice(0,typedText.length-1); //test
        break;
      default:
        if (capsTriggered) {
          typedText = typedText + value.toUpperCase();
        } else {
          typedText = typedText + value.toUpperCase();
        }
        setShiftTriggered(false);
        setKeyStructure(randomiseKeyStructure(keyStructure));
        setKeys(generateKeys());
    }
    textEvent(typedText);
  }

  const onClickEvent = (value) => {
    console.log("got here",value);
    // let finalString = '';
    keyActions(value);
    // randomiseKeys();
  }

  return (
    <div>
      {keys.map((elem,i) => {
          return <span><Key key={i} keyItem={elem} index={i} onClick={onClickEvent}></Key></span>;
      })}
    </div>
  )
};

Keyboard.defaultProps = {
  title: 'Keyboard'
};

Keyboard.propTypes = {
  title: PropTypes.string
};
export default Keyboard;
