import * as React from "react";

export interface ColorShades {
  color: string;
  light: string;
  medium: string;
  dark: string;
}

export const Themes = {
  original: [
    // https://coolors.co/f94d50-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
    { color: "#0000ff", light: "#7F7FFF", medium: "#0000CC", dark: "#00007F" }, // Blue Border
    { color: "#c0c0c0", light: "#D9D9D9", medium: "#999999", dark: "#4C4C4C" }, // Gray J
    { color: "#800080", light: "#CC99CC", medium: "#660066", dark: "#400040" }, // Pink L
    { color: "#800000", light: "#BF7F7F", medium: "#660000", dark: "#4C0000" }, // Red I
    { color: "#000080", light: "#7F7FBF", medium: "#000066", dark: "#000040" }, // Blue O
    { color: "#008000", light: "#7FBF7F", medium: "#006600", dark: "#004000" }, // Green S
    { color: "#808000", light: "#BFBF7F", medium: "#666600", dark: "#404000" }, // Yellow T
    { color: "#008080", light: "#7FBFBF", medium: "#006666", dark: "#004040" }, // Light Blue Z
  ],
  originalFlat: [
    // https://coolors.co/f94d50-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
    { color: "#0000ff", light: "#0000ff", medium: "#0000ff", dark: "#0000ff" }, // Blue Border
    { color: "#c0c0c0", light: "#c0c0c0", medium: "#c0c0c0", dark: "#c0c0c0" }, // Gray J
    { color: "#800080", light: "#800080", medium: "#800080", dark: "#800080" }, // Pink L
    { color: "#800000", light: "#800000", medium: "#800000", dark: "#800000" }, // Red I
    { color: "#000080", light: "#000080", medium: "#000080", dark: "#000080" }, // Blue O
    { color: "#008000", light: "#008000", medium: "#008000", dark: "#008000" }, // Green S
    { color: "#808000", light: "#808000", medium: "#808000", dark: "#808000" }, // Yellow T
    { color: "#008080", light: "#008080", medium: "#008080", dark: "#008080" }, // Light Blue Z
  ],
  alternate: [
    // https://coolors.co/f94d50-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
    { color: "#aaaaaa", light: "#cccccc", medium: "#888888", dark: "#666666" }, // Gray Border
    { color: "#F94144", light: "#fcb0b2", medium: "#f7262a", dark: "#760406" }, // Red Salsa
    { color: "#F3722C", light: "#f8b18b", medium: "#e75a0d", dark: "#873408" }, // Orange Red
    { color: "#F8961E", light: "#fbc888", medium: "#ed8607", dark: "#8b4e04" }, // Yellow Orange
    { color: "#F9C74F", light: "#fce5b0", medium: "#f7b926", dark: "#765404" }, // MaizeCrayola
    { color: "#90BE6D", light: "#c9dfb9", medium: "#7eb356", dark: "#44632c" }, // Pistachio
    { color: "#43AA8B", light: "#8ad0bb", medium: "#3a9278", dark: "#235848" }, // Zomp
    { color: "#577590", light: "#b3c3d1", medium: "#4d6880", dark: "#2e3e4d" }, // QueenBlue
  ],
};

export const ThemeContext = React.createContext(Themes.alternate);
