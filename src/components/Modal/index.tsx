"use client";
import { Frame } from "@/atoms";
import { useResponsiveType } from "@/hooks";
import { modalSlice, useAppDispatch, useAppSelector } from "@/libs";
import {
  animations,
  colors,
  UseBorderStyleProps,
  UseFlexStyleProps,
  UsePaddingStyleProps,
  UseRadiusStyleProps,
} from "@/styles";
import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Backdrop from "../Backdrop";
import Button from "../Button";
import Icon from "../Icon";

type ModalHeaderProps = UsePaddingStyleProps &
  UseFlexStyleProps & {
    children: React.ReactNode;
    isClose?: boolean;
  };
type ModalBodyProps = UsePaddingStyleProps &
  UseFlexStyleProps & {
    children: React.ReactNode;
  };
type ModalFooterProps = UsePaddingStyleProps &
  UseFlexStyleProps & {
    children: React.ReactNode;
  };

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  isClose = false,
  ...props
}) => {
  const dispatch = useAppDispatch();
  return (
    <Frame
      row
      alignment={isClose ? "center" : undefined}
      w={"100%"}
      gap={isClose ? "auto" : undefined}
      {...props}
    >
      {children}
      {isClose && (
        <Button
          onClick={() => {
            dispatch(modalSlice.actions.onInvisiable());
          }}
          isIconOnly
          activeStyle={{ opacity: 0.3 }}
        >
          <Icon type={"line"} name={"x"} />
        </Button>
      )}
    </Frame>
  );
};
export const ModalBody: React.FC<ModalBodyProps> = ({ children, ...props }) => {
  return (
    <Frame col w={"100%"} {...props}>
      {children}
    </Frame>
  );
};
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  ...props
}) => {
  return (
    <Frame row w={"100%"} {...props}>
      {children}
    </Frame>
  );
};

export type ModalGroupChildrenType =
  | React.ReactElement<typeof ModalHeader>
  | React.ReactElement<typeof ModalBody>
  | React.ReactElement<typeof ModalFooter>
  | (
      | React.ReactElement<typeof ModalHeader>
      | React.ReactElement<typeof ModalBody>
      | React.ReactElement<typeof ModalFooter>
    )[];
export type ModalGroupProps = UsePaddingStyleProps &
  UseBorderStyleProps &
  UseRadiusStyleProps & {
    children: ModalGroupChildrenType;
    w?: CSSProperties["width"];
    placement?: "bottom" | "center";
    isAnimation?: boolean;
    isBackdrop?: boolean;
    isBackdropClose?: boolean;
    isBackdropBlur?: boolean;
    backdropOpacity?: CSSProperties["opacity"];
    backdropColor?: CSSProperties["backgroundColor"];
  };

const Modal: React.FC<ModalGroupProps> = ({
  children,
  backdropOpacity,
  backdropColor,
  stroke,
  radius,
  radiusBL,
  radiusBR,
  radiusTL,
  radiusTR,
  w,
  isBackdropBlur = false,
  isBackdrop = false,
  isBackdropClose = false,
  placement = "bottom",
  isAnimation = true,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { responsiveType } = useResponsiveType();
  const [modalHeight, setModalHeight] = useState<CSSProperties["height"]>(0);
  const visiable = useAppSelector((state) => state.modal.visiable);
  const { fromApp, safeArea } = useAppSelector((state) => state.app.response);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onCloseHandler = async () => {
      if (isAnimation) {
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            +animations.modal.transitionDuration.toString().replace("ms", "")
          )
        );
        setModalHeight(0);
      } else {
        setModalHeight(0);
      }
    };
    if (visiable) {
      setModalHeight("100%");
    } else {
      onCloseHandler();
    }
    //eslint-disable-next-line
  }, [visiable]);

  const header = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === ModalHeader
      ),
    [children]
  );
  const body = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === ModalBody
      ),
    [children]
  );
  const footer = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === ModalFooter
      ),
    [children]
  );

  if (header.length > 1) {
    throw new Error("Only one Modal.Header can be used in ModalGroup.");
  }
  if (body.length > 1) {
    throw new Error("Only one Modal.Body can be used in ModalGroup.");
  }
  if (footer.length > 1) {
    throw new Error("Only one ModalFooter can be used in ModalGroup.");
  }

  const contentsAnimation = useMemo(() => {
    if (isAnimation) {
      if (visiable) {
        return { transform: "translateY(0vh)", opacity: 1 };
      } else {
        return { transform: "translateY(10vh)", opacity: 0 };
      }
    }
  }, [visiable, isAnimation]);

  const calStroke = useMemo(() => {
    if (stroke) {
      if (responsiveType === "tablet" || responsiveType === "desktop") {
        return stroke;
      } else if (placement === "bottom") {
        return {
          color: stroke.color,
          size: stroke.size,
          perSide: ["top"],
        };
      }
    }
    return stroke;
  }, [stroke, responsiveType, placement]);

  const calRadius = useMemo(() => {
    if (responsiveType === "tablet" || responsiveType === "desktop") {
      return {
        radius,
        radiusTL,
        radiusTR,
        radiusBL,
        radiusBR,
      };
    } else if (placement === "bottom") {
      return {
        radiusTL: radiusTL ?? radius,
        radiusTR: radiusTR ?? radius,
      };
    }

    return {
      radius,
      radiusBL,
      radiusBR,
      radiusTL,
      radiusTR,
    };
  }, [
    placement,
    responsiveType,
    radius,
    radiusBL,
    radiusBR,
    radiusTL,
    radiusTR,
  ]);

  const calWidth = useMemo(() => {
    if (responsiveType !== "mobile") {
      if (w) {
        return w;
      } else {
        return 420;
      }
    } else if (placement === "bottom") {
      return "100%";
    } else {
      return "85%";
    }
  }, [w, placement, responsiveType]);

  const calAlightment = useMemo(() => {
    if (responsiveType !== "mobile") {
      return "center";
    } else if (placement === "bottom") {
      return "bottom-center";
    } else {
      return "center";
    }
  }, [responsiveType, placement]);

  const getSafeArea = useMemo(
    () => (placement === "bottom" && fromApp ? safeArea.size.bottom : 0),
    [fromApp, safeArea, placement]
  );

  return (
    <Frame
      col
      h={modalHeight}
      w={"100%"}
      overflow="hidden"
      position="fixed"
      inset={0}
      zIndex={99999}
    >
      <Frame
        col
        w={"100%"}
        h={"100%"}
        position="absolute"
        inset={0}
        zIndex={99999}
        alignment={calAlightment}
        bg={colors.transparent}
      >
        {isBackdrop && (
          <Backdrop
            onClose={() => {
              if (isBackdropClose) {
                dispatch(modalSlice.actions.onInvisiable());
              }
            }}
            isBlur={isBackdropBlur}
            opacity={backdropOpacity}
            bg={backdropColor}
          />
        )}
        <Frame
          zIndex={100}
          col
          ref={ref}
          bg={colors.white}
          w={calWidth}
          maxH={"70%"}
          overflow="y-scroll"
          stroke={calStroke as UseBorderStyleProps["stroke"]}
          radius={calRadius.radius}
          radiusTL={calRadius.radiusTL}
          radiusTR={calRadius.radiusTR}
          radiusBL={calRadius.radiusBL}
          radiusBR={calRadius.radiusBR}
          pb={getSafeArea}
          {...animations.modal}
          {...contentsAnimation}
          {...props}
        >
          {header}
          {body}
          {footer}
        </Frame>
      </Frame>
    </Frame>
  );
};

export default Modal;
