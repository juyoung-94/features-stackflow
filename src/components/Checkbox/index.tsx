import React, { CSSProperties, useMemo } from "react";

import Icon from "@/components/Icon";
import { ResponsiveType, useResponsiveType } from "@/hooks";
import { colors, UseFontStyleProps } from "@/styles";
import { IconName, IconType } from "@/types/icons";

type SizeProp = "sm" | "md" | "lg";

type CheckboxSizeProp = {
  size?: SizeProp;
};

export type CheckboxProps = CheckboxSizeProp &
  Partial<Record<ResponsiveType, CheckboxSizeProp>> & {
    icon?: {
      type: IconType;
      name: IconName[IconType];
    };
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    color?: string;
    borderColor?: string;
    fontColor?: UseFontStyleProps["fontColor"];
    gap?: number | string; // 새로운 prop 추가
  };

export const Checkbox: React.FC<CheckboxProps> = ({
  icon,
  label,
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  color = "#3B82F6",
  borderColor = "#9CA3AF",
  fontColor = colors.black,
  gap = 8, // 기본값 8px
  ...props
}) => {
  const { responsiveType } = useResponsiveType();
  const handleChange = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  const sizeClasses = {
    sm: "w-[16px] h-[16px]",
    md: "w-[20px] h-[20px]",
    lg: "w-[24px] h-[24px]",
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  const checkboxTopSizeMap = {
    sm: 3,
    md: 3,
    lg: 2,
  };

  const getSize = useMemo(() => {
    const value = props[responsiveType]?.size;
    return value !== undefined ? value : size;
  }, [size, props, responsiveType]);

  const labelSizeStyleMap: Record<
    SizeProp,
    Pick<CSSProperties, "color" | "fontSize" | "fontWeight" | "lineHeight">
  > = useMemo(() => {
    return {
      sm: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "22px",
      },
      md: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "26px",
        color: fontColor,
      },
      lg: {
        fontWeight: 400,
        fontSize: 18,
        lineHeight: "28px",
        color: fontColor,
      },
    };
  }, [fontColor]);
  // Top sm:3px md:3px lg:2px
  return (
    <label
      className={`flex items-start justify-start w-[100%]  ${disabled ? "opacity-50" : ""} `}
    >
      {/* <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      /> */}
      <div
        onClick={() => {
          if (!disabled) handleChange();
        }}
        className={`
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          ${
            sizeClasses[getSize]
          } rounded-sm inline-flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        style={{
          marginTop: checkboxTopSizeMap[getSize],
          backgroundColor: checked ? color : "white",
          border: `2px solid ${checked ? color : borderColor}`,
        }}
      >
        <div
          className={`flex items-center justify-center w-full h-full transition-transform duration-200 ${
            checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          {icon ? (
            <Icon
              type={icon.type}
              name={icon.name}
              fill="white"
              size={iconSizes[getSize]}
            />
          ) : (
            <Icon
              type="solid"
              name="check"
              fill="white"
              size={iconSizes[getSize]}
            />
          )}
        </div>
      </div>
      {label && (
        <span
          onClick={() => {
            if (!disabled) handleChange();
          }}
          className={`select-none block overflow-hidden break-words  ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          style={{
            marginLeft: typeof gap === "number" ? `${gap}px` : gap,
            ...labelSizeStyleMap[getSize],
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
