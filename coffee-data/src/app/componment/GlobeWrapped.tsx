import Globe from "react-globe.gl";
import { GlobeMethods } from "react-globe.gl";

type GlobeWrappedProps = {
  forwardRef: React.MutableRefObject<GlobeMethods | undefined>;
  otherProps: React.ComponentProps<typeof Globe>;
};

const GlobeWrapped = ({ forwardRef, ...otherProps }: GlobeWrappedProps) => (
  <Globe {...otherProps} ref={forwardRef} />
);

export default GlobeWrapped;
