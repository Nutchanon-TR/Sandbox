import { HTTP_METHOD } from "next/dist/server/web/http";

export interface ApiDetail {
  path: string
  method?: HTTP_METHOD
}