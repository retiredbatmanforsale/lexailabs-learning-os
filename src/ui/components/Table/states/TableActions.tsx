import { Button } from "../../Button";
import { IconName } from "../../Icon";
import { Menu } from "../../Menu";
import { TableAction } from "../types";

export function TableActions<T>({
  row,
  actions,
}: {
  row: T;
  actions: (row: T) => TableAction<T>[];
}) {
  const rowActions = actions(row);

  if (!rowActions || rowActions.length === 0) return null;

  const menuOptions = rowActions.map((action) => ({
    label: action.label,
    // Convert ReactNode icon to IconName if it's a string, otherwise omit
    icon:
      typeof action.icon === "string" ? (action.icon as IconName) : undefined,
    onClick: () => action.onClick(row),
    disabled: action.disabled,
  }));

  return (
    <div
      className="relative z-20"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Menu options={menuOptions} side="left">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Row actions"
          icon="more-horizontal"
        />
      </Menu>
    </div>
  );
}
