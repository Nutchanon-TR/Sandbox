'use client'

import { fetchData } from "@/utils/api";
import { API_SANDBOX } from "../constants/api/ApiSandbox";
import { SupplierOrder } from "@/interface/sandbox/SupplierOrder";
import { TitleDetail } from '@/interface/common/TitleDetail';
import { useChangeTitle } from "@/utils/breadCrumbUtil";
import { TITLE } from "@/constants/Title";
import { signIn } from "next-auth/react";

export default function Home() {
  useChangeTitle(TITLE.HOME);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl max-w-sm w-full text-center border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">Welcome</h1>
        <p className="mb-8 text-gray-500 dark:text-gray-400">Please sign in to continue</p>
        <button
          onClick={() => signIn('google', { redirectTo: '/message' })}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-xl transition-all shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
