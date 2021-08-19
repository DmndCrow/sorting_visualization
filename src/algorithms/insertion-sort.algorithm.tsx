import {BlockItem, State} from '../utils/types';
import {COMPLETED_COLOR, DEFAULT_COLOR, ITERATION_COLOR, SELECTED_COLOR} from '../utils/constants';

// initialize bubble sorting algorithm
function insertionSortInit(array: BlockItem[]): State {
  // set initial 2 nodes for comparison with required color
  // and mark rest of block items with default color
  array.forEach((node: BlockItem, i: number) => {
    array[i].color = i < 2 ? ITERATION_COLOR : DEFAULT_COLOR;
  });

  return {
    array,
    swaps: 0,
    comparisons: 0,
    i: 1,
    j: 0,
    done: false,
    selected_index: 0
  };
}

// update color of adjacent nodes
function updateColor(array: BlockItem[], index: number, color1: string, color2: string) {
  if (index >= 0 && index + 1 < array.length) {
    array[index].color = color1;
    array[index + 1].color = color2;
  }
}

// run insertion sort algorithm
function insertionSortStep(state: State): Partial<State> {
  let { array, swaps, comparisons, i, j } = state;

  // when reach the end, mark array as completed
  if (i === array.length) {
    array.forEach((node: BlockItem, index: number) => {
      array[index].color = COMPLETED_COLOR;
    });
    return {done: true};
  }

  // swap values based on condition
  if (j >= 0 && array[j + 1].value < array[j].value) {
    // restore default colors for previous nodes
    updateColor(array, j, DEFAULT_COLOR, DEFAULT_COLOR);

    // swap items and iterate to next node
    [array[j], array[j + 1]] = [array[j + 1], array[j]];
    swaps++;
    comparisons++;
    j--;

    // mark iterated node as selected
    updateColor(array, j, ITERATION_COLOR, SELECTED_COLOR);
  } else {
    // restore default colors for previous nodes
    updateColor(array, j, DEFAULT_COLOR, DEFAULT_COLOR);

    // start from next node
    j = i;
    i++;

    // mark next nodes as selected
    updateColor(array, i - 1, ITERATION_COLOR, SELECTED_COLOR);
  }

  return { array, swaps, comparisons, i, j };
}

// generator that runs insertion sort
function* runInsertionSort(array: BlockItem[]): Generator<State> {
  // generator initial state of an insertion sort algorithm
  let state: State = insertionSortInit(array);

  // return initial state
  yield state;

  // while list is not sorted update state and return it
  while (!state.done) {
    state = {
      ...state,
      ...insertionSortStep(state),
    };
    yield state;
  }

  // return final sorted state of a list
  yield state;
}

export {
  runInsertionSort
}
