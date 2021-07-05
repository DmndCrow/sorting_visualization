import React, {ChangeEvent} from 'react';
import PropTypes from 'prop-types';
import {algorithms} from '../../utils/constants';
import {HeaderProps} from '../../utils/props';

function Header({length, setLength, algorithm, setAlgorithm}: HeaderProps) {
  const changeAlgorithm = (ev: ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(ev.target.value);
  }

  return (
    <div className='Header'>
      <label htmlFor="headerSlider">{length}</label>
      <input type={'range'}
             id={'headerSlider'}
             min={10}
             max={500}
             step={10}
             value={length}
             onChange={(ev) => setLength(+ev.target.value)}
      />


      <select value={algorithm} onChange={(ev: ChangeEvent<HTMLSelectElement>) => changeAlgorithm(ev)}>
        {
          Object.entries(algorithms).map(([key, val], i: number) => {
            return <option key={i} value={key}>{val}</option>
          })
        }
      </select>
    </div>
  );
}

Header.propTypes = {
  length: PropTypes.number.isRequired,
  setLength: PropTypes.func.isRequired,
  algorithm: PropTypes.string.isRequired,
  setAlgorithm: PropTypes.func.isRequired
}

export default Header;
