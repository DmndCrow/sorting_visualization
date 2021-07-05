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
  value: number;
}

type HeaderProps = {
  length: number;
  setLength: any;
  algorithm: string;
  setAlgorithm: any;
}

export type {
  TableProps,
  ChartProps,
  BlockProps,
  HeaderProps
}
