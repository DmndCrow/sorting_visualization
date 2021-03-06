import {BlockItem, State} from '../utils/types';
import {COMPLETED_COLOR, DEFAULT_COLOR, ITERATION_COLOR} from '../utils/constants';

// initialize bubble sorting algorithm
function bubbleSortInit(array: BlockItem[]): State {
  // set initial 2 nodes for comparison with required color
  // and mark rest of block items with ITERATION color
  array.forEach((node: BlockItem, i: number) => {
    array[i].color = i < 2 ? ITERATION_COLOR : DEFAULT_COLOR;
  });

  return {
    array,
    swaps: 0,
    comparisons: 0,
    i: array.length - 1,
    j: 0,
    done: false,
    selected_index: 0
  };
}

// run bubble sort algorithm
function bubbleSortStep(state: State): Partial<State> {
  let { array, swaps, comparisons, i, j } = state;

  if (i < 0) {
    return {done: true};
  }

  // restore color of already visited node
  if (j > 0) {
    array[j - 1].color = DEFAULT_COLOR;
  }

  // mark nodes as selected
  array[j].color = ITERATION_COLOR;
  if (i > 0) {
    array[j + 1].color = ITERATION_COLOR;
  }

  // compare adjacent nodes and swap them, if necessary
  if (array[j].value > array[j + 1].value) {
    [array[j], array[j + 1]] = [array[j + 1], array[j]];
    swaps++;
  }
  comparisons++;

  // re-iterate after completing 1 round
  if (++j >= i) {
    // restore all colors
    array[j - 1].color = DEFAULT_COLOR;
    // mark sorted node as completed
    array[i].color = COMPLETED_COLOR;

    // start form beginning
    i--;
    j = 0;
  }

  return {array, swaps, comparisons, i, j};
}

// generator that runs bubble sort
function* runBubbleSort(array: BlockItem[]): Generator<State> {
  // generator initial state of an bubble sort algorithm
  let state: State = bubbleSortInit(array);

  // return initial state
  yield state;

  // while list is not sorted update state and return it
  while (!state.done) {
    state = {
      ...state,
      ...bubbleSortStep(state),
    };
    yield state;
  }

  // return final sorted state of a list
  yield state;
}

export {
  runBubbleSort
}
