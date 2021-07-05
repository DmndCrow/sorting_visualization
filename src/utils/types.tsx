type BlockItem = {
  value: number;
  color: string;
}

type State = {
  array: BlockItem[];
  swaps: number;
  comparisons: number;
  i: number;
  j: number;
  done: boolean;
}


export type {
  BlockItem,
  State
}
