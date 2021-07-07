import {BlockItem, State} from '../utils/types';
import {COMPLETED_COLOR, DEFAULT_COLOR, ITERATION_COLOR, SELECTED_COLOR} from '../utils/constants';

// initialize bubble sorting algorithm
function selectionSortInit(array: BlockItem[]): State {
  // set initial 2 nodes for comparison with required color
  // and mark rest of block items with default color
  array.forEach((node: BlockItem, i: number) => {
    let color = DEFAULT_COLOR;
    if (i === 0) {
      color = SELECTED_COLOR;
    } else if (i === 1) {
      color = ITERATION_COLOR;
    }
    array[i].color = color;
  });

  return {
    array,
    swaps: 0,
    comparisons: 0,
    i: 0,
    j: 1,
    done: false,
    selected_index: 0
  };
}

// run bubble sort algorithm
function selectionSortStep(state: State): Partial<State> {
  let { array, swaps, comparisons, i, j, selected_index } = state;

  // when reach the end, mark array as completed
  if (i === array.length) {
    return {done: true};
  }

  if (j < array.length) {
    array[j].color = DEFAULT_COLOR;

    if (array[selected_index].value > array[j].value) {
      array[selected_index].color = DEFAULT_COLOR;
      selected_index = j;
      array[selected_index].color = SELECTED_COLOR;
    }
    j++;
    if (j < array.length) {
      array[j].color = ITERATION_COLOR;
    }
  } else {
    [array[i], array[selected_index]] = [array[selected_index], array[i]];
    array[i].color = COMPLETED_COLOR;
    i++;
    j = i + 1;
    selected_index = i;

    if (j < array.length) {
      array[i].color = SELECTED_COLOR;
      array[j].color = ITERATION_COLOR;
    }
  }

  return { array, swaps, comparisons, i, j, selected_index };
}

// generator that runs bubble sort
function* runSelectionSort(array: BlockItem[]): Generator<State> {
  // generator initial state of an bubble sort algorithm
  let state: State = selectionSortInit(array);

  // return initial state
  yield state;

  // while list is not sorted update state and return it
  while (!state.done) {
    state = {
      ...state,
      ...selectionSortStep(state),
    };
    yield state;
  }

  // return final sorted state of a list
  yield state;
}

export {
  runSelectionSort
}
