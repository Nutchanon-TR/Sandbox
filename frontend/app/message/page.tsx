'use client';

import { TITLE } from "@/constants/Title";
import { useChangeTitle } from "@/utils/breadCrumbUtil";

export default function MessagePage() {
    useChangeTitle(TITLE.MESSAGE);

    return (
        <div>
            <h1 className="text-2xl font-bold">Message</h1>
        </div>
    );
}
