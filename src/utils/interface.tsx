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
  TableProps,
  ChartProps,
  BlockProps,
  BlockItem,
  State
}