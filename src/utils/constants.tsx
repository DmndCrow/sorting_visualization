import {
  runBubbleSort, runInsertionSort, runSelectionSort
} from '../algorithms';

export const DEFAULT_COLOR = '#68f3e9';
export const COMPLETED_COLOR = '#0dee06'
export const SELECTED_COLOR = '#db035a';
export const ITERATION_COLOR = '#edfc19';

export const algorithms: { [key: string]: { label: string, sorting: any } } = {
  'bubble-sort': {label: 'Bubble Sort', sorting: runBubbleSort},
  'insertion-sort': {label: 'Insertion Sort', sorting: runInsertionSort},
  'selection-sort': {label: 'Selection Sort', sorting: runSelectionSort},
};
