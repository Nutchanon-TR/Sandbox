export interface SortRequest {
  field: string;       // e.g., "id", "name"
  direction: 'asc' | 'desc';
}
