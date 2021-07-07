import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './visualization.component.css';
import PropTypes from 'prop-types';
import {BlockItem} from '../../utils/types';
import {shuffleArray} from '../../utils/functions';
import {runBubbleSort} from '../../algorithms/bubble-sort.algorithm';
import {algorithms, DEFAULT_COLOR} from '../../utils/constants';
import {generateChart} from '../../utils/functions';
import {ChartProps, TableProps} from '../../utils/props';

// setup height and width of the vertical bar
const Chart = ({children, height, width}: ChartProps) => (
  <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
    {children}
  </svg>
);

function Visualization({length, algorithm}: TableProps) {
  const [list, setList] = useState<BlockItem[]>(Array);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [delayTime, setDelayTime] = useState<number>(0);
  const [chartVisualization, setChartVisualization] = useState<JSX.Element[]>([]);
  const [comparison, setComparison] = useState<number>(0);
  const [swap, setSwap] = useState<number>(0);

  const buttonRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const changeAlgoRef = useRef<any>(null);


  useEffect(() => {
    // generate shuffled array from 0 to n (length)
    generateShuffledArray();
  }, [length]);

  useEffect(() => {
    if (list.length > 0) {
      setChartVisualization([...generateChart(list, height, width)]);
    }
  }, [list]);

  // every time algorithm changed
  useEffect(() => {
    if (changeAlgoRef.current) {
      // create new shuffled array
      generateShuffledArray();
      // stop currently running async function
      changeAlgoRef.current.click();

      // update chart to initial array
      setChartVisualization([...generateChart(list, height, width)]);
    }
  }, [algorithm]);

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
  };

  const runSortingAlgorithm = async () => {
    // create generator from sorting algorithm
    let it = algorithms[algorithm].sorting(list);

    // create local delay timer
    let localDelayTime = delayTime;
    let result = it.next();
    let stop = false;
    let pause = false;

    while (!result.done && !stop) {
      if (!pause) {
        setChartVisualization([...generateChart(result.value.array, height, width)]);
        // setComparison(result.value.comparisons);
        // setSwap(result.value.swaps);

        await new Promise((resolve, reject) => {
          // sleep for n milliseconds
          setTimeout(() => resolve(null), localDelayTime);

          // on button click to rerun algorithm, restore generator with initial data
          buttonRef.current.addEventListener('click', () => {
            resolve(it = runBubbleSort(list));
          });

          // on delayTime change, update local variable
          inputRef.current.addEventListener('change', (event: ChangeEvent<HTMLInputElement>) => {
            resolve(localDelayTime = +event.target.value);
          });

          // on sorting algorithm change, stop function
          changeAlgoRef.current.addEventListener('click', () => {
            resolve(stop = true);
          });
        });

        // go to next element of an iterator
        result = it.next();
      }
    }
  }

  return (
    <div>
      <div className={'Visualization'}>
        <div className={'Charts'}>
          <Chart height={height} width={width}>
            {chartVisualization}
          </Chart>
          <p>Number of comparisons: {comparison}</p>
          <p>Number of swaps: {swap}</p>
        </div>
      </div>
      <label htmlFor="slider">{delayTime}</label>
      <input type={'range'}
             ref={inputRef}
             id={'slider'}
             min={0}
             max={100}
             step={10}
             value={delayTime}
             onChange={(ev) => setDelayTime(+ev.target.value)}
      />
      <button ref={buttonRef} onClick={() => runSortingAlgorithm()}>Run script</button>
      <button ref={changeAlgoRef} hidden>Change Algo</button>
    </div>
  );
}

Visualization.propTypes = {
  length: PropTypes.number.isRequired,
  algorithm: PropTypes.string.isRequired
};

export default Visualization;
