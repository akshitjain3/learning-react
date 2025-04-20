import MenuItem from "./MenuItem";
import { TreeMenuItemInterface } from "./TreeView";

interface MenuListProps {
  list: TreeMenuItemInterface[];
  handleContentChange: (label: string) => void;
  child?: boolean;
}

export default function ({ list, handleContentChange, child }: MenuListProps) {
  return (
    <ul className="menu-item-ul">
      {list.map((item) => (
        <MenuItem
          key={item.label}
          item={item}
          handleChangeContent={handleContentChange}
          addIcon={child}
        />
      ))}
    </ul>
  );
}
