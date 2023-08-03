import Typography from "@mui/material/Typography";
import {ReactNode} from "react";

interface SharedHeadingProps {
  readonly text?: string;
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
  readonly color?: string;
  readonly children?: ReactNode;
}

export function SharedHeading({level, text, children, color = 'text.primary'}: SharedHeadingProps ) {
  return (
    <Typography variant={`h${level}`} color={color}>
      {children || text}
    </Typography>
  )
}
