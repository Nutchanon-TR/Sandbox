import { ApiDetail } from "./../../interface/ApiDetail";

const contextPath = ''

export const API_COMMON: Record<string, ApiDetail> = {
    UPLOAD_IMAGE: {
        path: `${contextPath}/v1/api/menu/items`,
        method: 'POST', 
    },
    SUPPLIER_ORDER_LIST: {
        path: `${contextPath}/v1/api/supplier-orders/inquiry`,
        method: 'POST',
    }
}