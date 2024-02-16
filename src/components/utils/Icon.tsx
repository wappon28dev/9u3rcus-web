import { Icon as Iconify } from "@iconify/react";
import type { ColorToken } from "panda/tokens";
import type { ReactElement } from "react";
import { styled as p } from "panda/jsx";

export function Icon({
  icon,
  size = 1,
  color,
}: {
  icon: string;
  size?: number;
  color?: ColorToken;
}): ReactElement {
  return (
    <p.span color={color}>
      <Iconify height={25 * size} icon={icon} width={25 * size} />
    </p.span>
  );
}
