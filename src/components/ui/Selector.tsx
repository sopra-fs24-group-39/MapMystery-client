import React from "react";
import "../../styles/ui/Selector.scss";

interface TabSelectorProps {
  width: string;
  height: string;
  options: string[];
  onChange: (option: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ width, height, options, onChange }) => {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const handleSelection = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="tab-selector" style={{ width, height }}>
      {options.map((option) => (
        <div
          key={option}
          className={`tab-option ${selectedOption === option ? "active" : ""}`}
          onClick={() => handleSelection(option)}
          style={{ width: `calc(${width} / ${options.length})` }}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default TabSelector;
