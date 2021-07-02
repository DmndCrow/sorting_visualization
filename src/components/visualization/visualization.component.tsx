import React, {useEffect, useState} from 'react';
import './visualization.component.css';
import PropTypes from 'prop-types';
import {ChartProps, TableProps} from '../../utils/interface';
import {shuffleArray} from '../../utils/functions';
import Block from '../block/block.component';

const Chart = ({ children, height, width }: ChartProps) => (
  <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
    {children}
  </svg>
)

function Visualization({length}: TableProps) {
  const [list, setList] = useState<number[]>(Array);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const blockWidth = 20;
  const blockMargin = 5;

  useEffect(() => {
    let array = shuffleArray(Array.from(Array(length).keys()));
    setList([...array]);

    setWidth(array.length * (blockWidth + blockMargin));
    setHeight(Math.max(...array) * 10);
  }, [length]);


  return (
    <div className={'Visualization'}>
      <Chart height={height} width={width}>
        {list.map((val, i) => {
          const h = (val + 1) * 10;
          return (
            <Block key={i}
                   height={h}
                   width={blockWidth}
                   x={i * (blockWidth + blockMargin)}
                   y={height - h}
            />
          )
        })}
      </Chart>
    </div>
  );
}

Visualization.propTypes = {
  length: PropTypes.number.isRequired
}

export default Visualization;
