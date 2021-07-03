import React, {useEffect, useState} from 'react';
import './visualization.component.css';
import PropTypes from 'prop-types';
import {BlockItem, ChartProps, State, TableProps} from '../../utils/interface';
import {delay, shuffleArray} from '../../utils/functions';
import {bubbleSortInit, bubbleSortStep} from '../../algorithms/bubble-sort.algorithm';
import {DEFAULT_COLOR} from '../../utils/constants';
import {Block} from '../block';

// setup height and width of the vertical bar
const Chart = ({ children, height, width }: ChartProps) => (
  <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
    {children}
  </svg>
)

function Visualization({length}: TableProps) {
  const [list, setList] = useState<BlockItem[]>(Array);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [delayTime, setDelayTime] = useState<number>(200);

  const blockWidth = 30;
  const blockMargin = 10;
  const heightIncrement = 15;

  useEffect(() => {
    // generate shuffled array from 0 to n (length)
    generateShuffledArray();
  }, [length]);

  const generateShuffledArray = () => {
    let initArray = Array.from(Array(length).keys());

    let array: BlockItem[] = shuffleArray(initArray.map(x => {
      let v: BlockItem = {color: DEFAULT_COLOR, value: x};
      return v;
    }));
    setList([...array]);

    setWidth(array.length * (blockWidth + blockMargin));
    setHeight(Math.max(...array.map((x: BlockItem) => x.value)) * heightIncrement);
  }


  const runSort = async () => {
    let state: State = bubbleSortInit(list);

    setList([...state.array]);
    await delay(delayTime);

    while (!state.done) {
      state = {
        ...state,
        ...bubbleSortStep(state)
      };
      setList([...state.array]);
      await delay(delayTime);
    }

    setList([...state.array]);
  }

  const updateDelay = (ms: string) => {
    setDelayTime(+ms);
  }

  return (
    <div>
      <div className={'Visualization'}>
        <Chart height={height} width={width}>
          {list.map((block: BlockItem, i: number) => {
            // use val + 1, since we have element with value = 0
            const h = (block.value + 1) * (heightIncrement - 5);
            return (
              <Block key={i}
                     height={h}
                     width={blockWidth}
                     x={i * (blockWidth + blockMargin)}
                     y={height - h}
                     color={block.color}
              />
            )
          })}
        </Chart>
      </div>
      <label htmlFor='slider'>{delayTime}</label>
      <input type={'range'}
             id={'slider'}
             min={200}
             max={2000}
             step={200}
             value={delayTime}
             onChange={(ev) => updateDelay(ev.target.value)}
      />
      <button onClick={() => runSort()}>Run script</button>
    </div>
  );
}

Visualization.propTypes = {
  length: PropTypes.number.isRequired
}

export default Visualization;
