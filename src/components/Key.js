import PropTypes from 'prop-types';

const Key = ({keyItem, index, onClick}) => {
  // console.log(keyItem);
  // console.log(key);
  // console.log(onClick)
  let buttonClicked = (e) => {
    // console.log(value);
    onClick(keyItem);
  }

  return (
    <>
      <button className="btn" onClick={buttonClicked}>{keyItem}</button>
      {index%13==0 && index!=0?<br></br>:''}
    </>
  )
};

// Key.defaultProps = {
//   title: 'key'
// };

// Key.propTypes = {
//   title: PropTypes.string
// };
export default Key;
