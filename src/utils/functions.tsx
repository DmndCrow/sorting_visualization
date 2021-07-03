import {BlockItem, State} from './interface';
import React from 'react';
import {Block} from '../components/block';

function shuffleArray(props: BlockItem[]) {
  let array = [...props];

  // for each element of array
  for (let i = array.length - 1; i > 0; i--) {
    // random select another index
    const j = Math.floor(Math.random() * (i + 1));
    // swap two elements
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const generateChart = (array: BlockItem[], height: number, width: number): JSX.Element[] => {
  return (array.map((block: BlockItem, i: number) => {
    // use val + 1, since we have element with value = 0
    // create dynamic value to display all blocks
    let ratio = width / (4 * array.length);

    // create dynamic height of a block
    const usableHeight = height * 0.75;
    const blockHeight = (block.value + 1) / array.length * usableHeight;

    return (
      <Block key={i}
             height={blockHeight}
             width={3 * ratio}
             x={i * 4 * ratio}
             y={height - blockHeight}
             value={block.value + 1}
             color={block.color}
      />
    );
  }))
}


export {
  shuffleArray,
  generateChart,
  delay
}
