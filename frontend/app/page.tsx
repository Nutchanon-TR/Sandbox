'use client'

import { fetchData } from "@/utils/api";
import { API_SANDBOX } from "./api/ApiSandbox";
import { SupplierOrder } from "@/interface/sandbox/SupplierOrder";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    fetchData<SupplierOrder>(API_SANDBOX.SUPPLIER_ORDER, {}).then((data) => {
      console.log("Supplier Orders:", data);
    }).catch((error) => {
      console.error("Error fetching supplier orders:", error);
    });
  }, [])

  return (<>
    Hello
  </>
  );
}
