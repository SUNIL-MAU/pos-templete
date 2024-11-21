import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  text: string;
  total?: string;
  rate?: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  text,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-xs font-bold text-black dark:text-white">
            {text}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

      </div>
    </div>
  );
};

export default CardDataStats;
