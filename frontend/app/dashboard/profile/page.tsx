'use client';

import { TITLE } from "@/constants/Title";
import { useChangeTitle } from "@/utils/breadCrumbUtil";

export default function ProfilePage() {
    useChangeTitle(TITLE.DASHBOARD, "PROFILE");

    return (
        <div className="">
            <h1 className="text-2xl font-bold">Profile</h1>
        </div>
    );
}
