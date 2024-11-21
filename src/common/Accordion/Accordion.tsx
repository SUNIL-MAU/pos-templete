import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

interface AccordionProps {
  items: any;
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  console.log(Array(items))

  return (
    <div className="w-full mx-auto mt-10">
      {Object.keys(items).map((item, index) => (
        <AccordionItem
          key={index}
          title={item}
          content={item}
          isActive={activeIndex === index}
          onClick={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
