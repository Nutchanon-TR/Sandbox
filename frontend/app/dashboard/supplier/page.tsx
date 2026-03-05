'use client';

import { TITLE } from "@/constants/Title";
import { useChangeTitle } from "@/utils/breadCrumbUtil";

export default function SupplierPage() {
    useChangeTitle(TITLE.DASHBOARD, "SUPPLIER");

    return (
        <div>
            <h1 className="text-2xl font-bold">Supplier</h1>
        </div>
    );
}
