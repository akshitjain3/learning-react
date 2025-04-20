import { useState } from "react";
import MenuList from "./MenuList";
import { TreeMenuItemInterface } from "./TreeView";
import down_right from "/assets/down-right.svg";

interface MenuItemProps {
  item: TreeMenuItemInterface;
  handleChangeContent: (label: string) => void;
  addIcon?: boolean;
}

export default function MenuItem({
  item,
  handleChangeContent,
  addIcon = false,
}: MenuItemProps) {
  const [expandState, setExpandState] = useState<{ [key: string]: Boolean }>(
    {}
  );
  function toggleExpandState(label: string) {
    setExpandState((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  }

  return (
    <>
      <li>
        <div className="menu-item">
          {addIcon ? <img src={down_right} alt="Hierarchy Icon" /> : null}
          <p onClick={() => handleChangeContent(item.label)}>{item.label}</p>
          {item.children ? (
            <button onClick={() => toggleExpandState(item.label)}>
              {expandState[item.label] ? "-" : "+"}
            </button>
          ) : null}
        </div>
      </li>
      {item.children && expandState[item.label] ? (
        <MenuList
          child={true}
          list={item.children}
          handleContentChange={handleChangeContent}
        />
      ) : null}
    </>
  );
}
