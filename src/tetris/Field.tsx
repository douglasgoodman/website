import * as React from "react";
import { Layer } from "react-konva";
import { FieldPadding } from "./constants";

export interface FieldProps {
  children?: React.ReactNode;
}

export const Field = (props: FieldProps) => {
  return (
    <Layer x={FieldPadding} y={FieldPadding}>
      {props.children}
    </Layer>
  );
};
