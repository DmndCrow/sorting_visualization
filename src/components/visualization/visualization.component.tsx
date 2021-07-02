import React, {useEffect, useState} from 'react';
import './visualization.component.css';
import PropTypes from 'prop-types';
import {ChartProps, State, TableProps} from '../../utils/interface';
import {shuffleArray} from '../../utils/functions';
import Block from '../block/block.component';
import {bubbleSortInit, bubbleSortStep} from '../../algorithms/bubble-sort.algorithm';

// setup height and width of the table
const Chart = ({ children, height, width }: ChartProps) => (
  <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
    {children}
  </svg>
)

function Visualization({length}: TableProps) {
  const [list, setList] = useState<number[]>(Array);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const blockWidth = 30;
  const blockMargin = 10;
  const heightIncrement = 15;

  useEffect(() => {
    // generate shuffled array from 0 to n (length)
    let array = shuffleArray(Array.from(Array(length).keys()));
    setList([...array]);

    setWidth(array.length * (blockWidth + blockMargin));
    setHeight(Math.max(...array) * heightIncrement);
  }, [length]);

  const runSort = () => {
    let state: State = bubbleSortInit(list);

    while (!state.done) {
      state = {
        ...state,
        ...bubbleSortStep(state)
      };
    }

    setList([...state.array]);
    console.log(list);
  }

  return (
    <div>
      <div className={'Visualization'}>
        <Chart height={height} width={width}>
          {list.map((val, i) => {
            // use val + 1, since we have element with value = 0
            const h = (val + 1) * (heightIncrement - 5);
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
      <button onClick={() => runSort()}>Run script</button>
    </div>
  );
}

Visualization.propTypes = {
  length: PropTypes.number.isRequired
}

export default Visualization;
