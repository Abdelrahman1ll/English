import {
  Circle,
  Square,
  Triangle,
  Octagon,
  Box,
  Cylinder,
  Cone,
  Pyramid,
  Star,
  Heart,
  Diamond,
  Gem,
} from "lucide-react";

export const SHAPES_DATA = {
  "2D": [
    { name: "Circle", arabic: "دائرة", icon: Circle },
    { name: "Oval", arabic: "بيضاوي", cssClass: "rounded-[50%] w-12 h-8" },
    { name: "Square", arabic: "مربع", icon: Square },
    { name: "Triangle", arabic: "مثلث", icon: Triangle },
    { name: "Rectangle", arabic: "مستطيل", cssClass: "w-12 h-8 bg-current" },
    { name: "Star", arabic: "نجمة", icon: Star },
    { name: "Heart", arabic: "قلب", icon: Heart },
    { name: "Diamond", arabic: "دايموند", icon: Diamond },
    { name: "Pentagon", arabic: "خماسي", icon: Gem },
    { name: "Octagon", arabic: "مثمن", icon: Octagon },
  ],
  "3D": [
    { name: "Cube", arabic: "مكعب", icon: Box },
    { name: "Sphere", arabic: "كروي", icon: Circle },
    { name: "Cylinder", arabic: "أسطواني", icon: Cylinder },
    { name: "Cone", arabic: "قرطاس", icon: Cone },
    { name: "Pyramid", arabic: "هرم", icon: Pyramid },
  ],
};
