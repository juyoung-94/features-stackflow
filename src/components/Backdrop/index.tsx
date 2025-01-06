import { Frame } from "@/atoms";
import { colors } from "@/styles";
import { CSSProperties } from "react";

const Backdrop: React.FC<{
  onClose?: () => void;
  opacity?: CSSProperties["opacity"];
  isBlur?: boolean;
  bg?: string;
  zIndex?: number;
}> = ({
  zIndex = 99,
  opacity = 0.3,
  bg = colors.black,
  isBlur = false,
  onClose = () => {},
}) => {
  return (
    <Frame
      onClick={() => {
        onClose();
      }}
      position="absolute"
      w={"100%"}
      h={"100%"}
      zIndex={zIndex}
      bg={isBlur ? "#00000066" : bg}
      opacity={isBlur ? undefined : opacity}
      effects={isBlur ? [{ blur: 4, style: "layer-blur" }] : []}
    />
  );
};
Backdrop.displayName = "Hingoray.Backdrop";

export default Backdrop;
