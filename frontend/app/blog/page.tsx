'use client';

import { useChangeTitle } from "@/utils/breadCrumbUtil";
import { useMemo } from "react";

export default function BlogPage() {
    const pageTitles = useMemo(() => [
        { title: 'Blog', urlPath: '/blog' },
    ], []);
    useChangeTitle(pageTitles);

    return (
        <div>
            <h1 className="text-2xl font-bold">Blog</h1>
        </div>
    );
}
