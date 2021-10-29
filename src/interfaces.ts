export interface BlissData {
  data: {
    id?: string;
    name: string;
    groupKey: string;
    title: string;
    viewbox: string;
    path: string;
  };
  children?: BlissData[];
}
