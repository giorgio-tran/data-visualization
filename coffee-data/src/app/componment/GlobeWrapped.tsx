"use client";

import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import { GlobeMethods } from "react-globe.gl";

type GlobeWrappedProps = {
  forwardRef: React.MutableRefObject<GlobeMethods | undefined>;
} & React.ComponentProps<typeof Globe>;

const GlobeWrapped = ({ forwardRef, ...otherProps }: GlobeWrappedProps) => {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (window) {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }
    };

    updateWidth();
    if (window) {
      window.addEventListener("resize", updateWidth);
    }
    console.log("rerendering globe");
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <Globe {...otherProps} height={height} width={width} ref={forwardRef} />
  );
};

export default GlobeWrapped;
