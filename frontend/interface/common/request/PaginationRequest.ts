import { SortRequest } from "./SortRequest";

export interface PaginationRequest {
  page?: number;       // default: 0
  size?: number;       // default: 10
  sort?: SortRequest[]; // default: [{ field: "id", direction: "asc" }]
}
