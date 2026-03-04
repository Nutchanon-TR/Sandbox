'use client'

import { fetchData } from "@/utils/api";
import { API_SANDBOX } from "../constants/api/ApiSandbox";
import { SupplierOrder } from "@/interface/sandbox/SupplierOrder";
import { TitleDetail } from '@/interface/common/TitleDetail';
import { useChangeTitle } from "@/utils/breadCrumbUtil";
import { useEffect, useMemo } from "react";

export default function Home() {
  const pageTitles = useMemo(() => [
  { title: 'หน้าแรก', urlPath: '/' },
  { title: 'ข้อมูลส่วนตัว', urlPath: '/settings/profile' },
], []);
  useChangeTitle(pageTitles);

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
