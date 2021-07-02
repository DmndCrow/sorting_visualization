type TableProps = {
  length: number,
}

type ChartProps = {
  children: any;
  height: number;
  width: number;
}

type BlockProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

type State = {
  array: number[];
  swaps: number;
  comparisons: number;
  i: number;
  j: number;
  done: boolean;
}


export type {
  TableProps,
  ChartProps,
  BlockProps,
  State
}