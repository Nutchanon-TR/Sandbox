import { ApiDetail } from "@/interface/common/ApiDetail";

const contextPath = process.env.NEXT_PUBLIC_API_URL

export const API_SANDBOX: Record<string, ApiDetail> = {
    UPLOAD_IMAGE: {
        path: `${contextPath}/v1/api/menu/items`,
        method: 'POST', 
    },
    SUPPLIER_ORDER: {
        path: `${contextPath}/v1/api/supplier-order/inquiry`,
        method: 'GET',
    }
}