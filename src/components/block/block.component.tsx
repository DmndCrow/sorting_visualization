import React from 'react';
import PropTypes from 'prop-types';
import {BlockProps} from '../../utils/props';

function Block({ x, y, width, height, color, value }: BlockProps) {
  return (
    <svg className="Block">
      <rect x={x} y={y} width={width} height={height} fill={color}/>
      {/*<text x={x} y={y}>{value}</text>*/}
    </svg>
  );
}

Block.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string
}

Block.defaultProps = {
  color: '#8ef1b7',
}

export default Block;
