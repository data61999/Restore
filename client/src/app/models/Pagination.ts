export interface MetaData {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export class PaginatedList<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metadata: MetaData) {
    this.items = items;
    this.metaData = metadata;
  }
}
