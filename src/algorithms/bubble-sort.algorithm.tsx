import {BlockItem, State} from '../utils/interface';
import {COMPLETED_COLOR, SELECTED_COLOR} from '../utils/constants';

function bubbleSortInit(array: BlockItem[]): State {
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
    array[j].color = SELECTED_COLOR;
    array[j + 1].color = SELECTED_COLOR;
    swaps++;
  }
  comparisons++;

  if (++j >= i) {
    array[i].color = COMPLETED_COLOR;
    i--;
    j = 0;
  }

  return {array, swaps, comparisons, i, j};
}

export {
  bubbleSortInit,
  bubbleSortStep
}