import { useState } from "react";
import "./tree-view.css";
import MenuList from "./MenuList";

export interface TreeMenuItemInterface {
  label: string;
  to: string;
  children?: TreeMenuItemInterface[];
}

interface TreeViewProps {
  list: TreeMenuItemInterface[];
}

export default function TreeView({ list }: TreeViewProps) {
  function findItemByLabel(
    items: TreeMenuItemInterface[],
    label: string
  ): TreeMenuItemInterface | undefined {
    for (const item of items) {
      if (item.label === label) return item;
      if (item.children) {
        const result = findItemByLabel(item.children, label);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }

  function handleContentChange(label: string) {
    const item = findItemByLabel(list, label);
    console.log(item);

    if (item) {
      setContentSrc(item.to);
      setContentAlt(item.label + " Content");
    }
  }
  const [contentSrc, setContentSrc] = useState(list[0].to);
  const [contentAlt, setContentAlt] = useState(list[0].label + " Content");
  return (
    <div className="treeViewCont">
      <div className="sidebar">
        <h2>Tree Menu</h2>
        <MenuList list={list} handleContentChange={handleContentChange} />
      </div>
      <div className="contentCont">
        <img src={contentSrc} alt={contentAlt} />
      </div>
    </div>
  );
}
