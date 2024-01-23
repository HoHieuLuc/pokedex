export interface ResourceList<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export interface ResourceData {
  name: string;
}
