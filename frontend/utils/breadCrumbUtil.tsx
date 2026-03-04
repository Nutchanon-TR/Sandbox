import { useEffect } from 'react';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { TitleDetail } from '../interface/common/TitleDetail';
import { useLayoutContext } from '../context/LayoutContext';
import GuardedLink from '@/components/GuardLink';

export function useChangeTitle(titles: TitleDetail[]) {
  const { setBreadCrumb, setCurrentTitle } = useLayoutContext(); // ดึงเองข้างในเลย
  
  useEffect(() => {
    let breadCrumb: BreadcrumbItemType[] = titles.map((title, index) => {
      if (title.urlPath && index !== titles.length - 1) {
              return {
                key: title.title,
                title: <GuardedLink href={title.urlPath}>{title.title}</GuardedLink>,
              };
            } else
              return {
                key: title.title,
                title: title.title,
              };
          });
    setCurrentTitle(titles);
    setBreadCrumb(breadCrumb);
  }, [titles]);
}
