import PropTypes from 'prop-types';
import Key from './Key';
// import { useState } from 'react';
import data from '../data.json';

const Keyboard = ({title, text, textEvent}) => {
  // const keys = data;
  let typedText = '';
  let shiftTriggered = true;
  let capsTriggered = true;
  const generateKeys = () => {
    return data.map((key)=> {
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

  // 1) randomise key implementation
  // 2) check what all are function keys
  // 3) fix all reload stuff

  const keyActions = (value) => {
    switch (value) {
      case 'shift':
        shiftTriggered = !shiftTriggered;
        keys = generateKeys();
        break;
      case 'caps':
        capsTriggered = !capsTriggered;
        keys = generateKeys();
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
        shiftTriggered = !shiftTriggered;
        keys = generateKeys();
        // code block
    }
    textEvent(typedText);
  }

  const onClickEvent = (value) => {
    console.log("got here",value);
    // let finalString = '';
    keyActions(value);
  }

  let keys = generateKeys();

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
