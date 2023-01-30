import React from "react";
import {classNames} from "../../utils/helper";

export function Prose({ className, ...props }: any) {
  return (
    <div
      id="test"
      className={classNames(
        className,

  )}
  {...props}

  />
)
}
