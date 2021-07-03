import {BlockItem, State} from '../utils/interface';
import {COMPLETED_COLOR, DEFAULT_COLOR, SELECTED_COLOR} from '../utils/constants';

function bubbleSortInit(array: BlockItem[]): State {
  array[0].color = SELECTED_COLOR;
  array[1].color = SELECTED_COLOR;

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

  if (j > 0) {
    array[j - 1].color = DEFAULT_COLOR;
  }

  array[j].color = SELECTED_COLOR;
  if (i > 0) {
    array[j + 1].color = SELECTED_COLOR;
  }

  if (array[j].value > array[j + 1].value) {
    [array[j], array[j + 1]] = [array[j + 1], array[j]];
    swaps++;
  }
  comparisons++;

  if (++j >= i) {
    array[j - 1].color = DEFAULT_COLOR;
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