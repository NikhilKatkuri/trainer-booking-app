import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgSearch = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-4.343-4.343m0 0A7.999 7.999 0 0 0 11 3a8 8 0 1 0 5.657 13.657"
    />
  </Svg>
);
export default SvgSearch;
