import PropTypes from 'prop-types';

const Key = ({keyItem, index, onClick}) => {
  let buttonClicked = (e) => {
    onClick(keyItem);
  }

  return (
    <>
      <button className="key button" onClick={buttonClicked}>{keyItem}</button>
      {index%13===0 && index!==0?<br></br>:''}
    </>
  )
};

Key.propTypes = {
  keyItem: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func
};
export default Key;
