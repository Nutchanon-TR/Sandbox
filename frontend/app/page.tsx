'use client'

import { fetchData } from "@/utils/api";
import { API_SANDBOX } from "../constants/api/ApiSandbox";
import { SupplierOrder } from "@/interface/sandbox/SupplierOrder";
import { TitleDetail } from '@/interface/common/TitleDetail';
import { useChangeTitle } from "@/utils/breadCrumbUtil";
import { TITLE } from "@/constants/Title";

export default function Home() {
  useChangeTitle(TITLE.HOME);

  // useEffect(() => {
  //   fetchData<SupplierOrder>(API_SANDBOX.SUPPLIER_ORDER, {}).then((data) => {
  //     console.log("Supplier Orders:", data);
  //   }).catch((error) => {
  //     console.error("Error fetching supplier orders:", error);
  //   });
  // }, [])

  return (<>
    Hello
  </>
  );
}
