export interface ResourceList<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}
