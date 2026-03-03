import React, { createContext, useContext, useState } from 'react';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { TitleDetail } from '../interface/common/TitleDetail';

export type LayoutContextType = {
  breadCrumb: BreadcrumbItemType[];
  currentTitle: TitleDetail[];
  setBreadCrumb: React.Dispatch<React.SetStateAction<BreadcrumbItemType[]>>;
  setCurrentTitle: React.Dispatch<React.SetStateAction<TitleDetail[]>>;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context)
    throw new Error('useLayoutContext must be used within LayoutProvider');
  return context;
};


export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [breadCrumb, setBreadCrumb] = useState<BreadcrumbItemType[]>([]);
  const [currentTitle, setCurrentTitle] = useState<TitleDetail[]>([]);

  return (
    <LayoutContext.Provider
      value={{
        breadCrumb,
        setBreadCrumb,
        currentTitle,
        setCurrentTitle,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
