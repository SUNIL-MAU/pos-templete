import React, { ReactNode } from 'react';

interface CardWrapperProps {
  children: ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
}) => {
  return (
    <div className="rounded-md border border-stroke bg-white py-4 px-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        {children}
    </div>
  );
};

export default CardWrapper;
