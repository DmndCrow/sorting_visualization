import {BlockItem} from './interface';

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


export {
  shuffleArray,
  delay
}