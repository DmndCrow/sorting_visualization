import {State} from '../utils/interface';

function bubbleSortInit(array: number[]): State {
  return {
    array,
    swaps: 0,
    comparisons: 0,
    i: array.length - 1,
    j: 0,
    done: false
  };
}


function bubbleSortStep(state: State): Partial<State> {
  let { array, swaps, comparisons, i, j } = state;

  if (i < 0) {
    return {done: true}
  }

  if (array[j] > array[j + 1]) {
    [array[j], array[j + 1]] = [array[j + 1], array[j]];
    swaps++;
  }
  comparisons++;

  if (++j >= i) {
    i--;
    j = 0;
  }

  return {array, swaps, comparisons, i, j};
}

export {
  bubbleSortInit,
  bubbleSortStep
}