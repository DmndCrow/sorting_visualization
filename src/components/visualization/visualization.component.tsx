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
  const [delayTime, setDelayTime] = useState<number>(0);
  const [history, setHistory] = useState<BlockItem[][]>([]);


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

    setWidth(window.innerWidth - 100);
    setHeight(800);
    setHeight(window.innerHeight);
  }


  const runSort = async () => {
    let a = new Date().getTime();

    let state: State = bubbleSortInit(list);
    let hst = [];

    setList([...state.array]);
    await delay(delayTime);

    while (!state.done) {
      hst.push(state.array);
      state = {
        ...state,
        ...bubbleSortStep(state)
      };
      setList([...state.array]);
      await delay(delayTime);
    }

    hst.push(state.array);
    setHistory(hst);

    console.log(new Date().getTime() - a, 'ms');
    setList([...state.array]);
  }

  const runAlgorithm = () => {
    runSort().then();
  }

  return (
    <div>
      <div className={'Visualization'}>
        <div className={'Charts'}>
          <Chart height={height} width={width}>
            {list.map((block: BlockItem, i: number) => {
              // use val + 1, since we have element with value = 0
              // create dynamic value to display all blocks
              let ratio = width / (4 * list.length);

              // create dynamic height of a block
              const usableHeight = height * 0.75;
              const blockHeight = (block.value + 1) / list.length * usableHeight;

              return (
                <Block key={i}
                       height={blockHeight}
                       width={3 * ratio}
                       x={i * 4 * ratio}
                       y={height - blockHeight}
                       value={block.value + 1}
                       color={block.color}
                />
              )
            })}
          </Chart>
        </div>
      </div>
      <label htmlFor='slider'>{delayTime}</label>
      <input type={'range'}
             id={'slider'}
             min={1}
             max={1000}
             step={50}
             value={delayTime}
             onChange={(ev) => setDelayTime(+ev.target.value)}
      />
      <button onClick={() => runAlgorithm()}>Run script</button>
    </div>
  );
}

Visualization.propTypes = {
  length: PropTypes.number.isRequired
}

export default Visualization;
