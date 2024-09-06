import { ReactNode, useState } from "react";
import ChevronUp from "../../assets/icons/ChevronUp";
import ChevronDown from "../../assets/icons/ChevronDown";

interface CollapsibleSectionpProps {
  title: string;
  isCollapsed?: boolean;
  subTitle?: string;
  children: ReactNode;
  setIsCollapsed?: (isCollapsed: boolean) => void;
}

function CollapsibleSection({
  title,
  subTitle,
  children,
  isCollapsed,
  setIsCollapsed,
}: CollapsibleSectionpProps) {
  const [isOpen, setIsOpen] = useState(isCollapsed ?? false);

  const toggleSection = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
    setIsCollapsed && setIsCollapsed(!isOpen);
  };

  return (
    <div className="border select-none w-full rounded-md mt-1 mb-1">
      <div
        className="p-2 flex space-between cursor-pointer"
        onClick={toggleSection}
      >
        {<div className="w-full">{title}</div>}
        {isOpen && subTitle && (
          <div className="w-full font-bold">{subTitle}</div>
        )}
        <div> {isOpen ? <ChevronUp /> : <ChevronDown />}</div>
      </div>
      {isOpen && children}
    </div>
  );
}

export default CollapsibleSection;
