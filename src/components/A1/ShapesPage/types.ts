import type { LucideIcon } from "lucide-react";

export interface ShapeItem {
  readonly name: string;
  readonly arabic: string;
  readonly icon?: LucideIcon;
  readonly cssClass?: string;
}

export interface ShapesData {
  readonly "2D": readonly ShapeItem[];
  readonly "3D": readonly ShapeItem[];
}
