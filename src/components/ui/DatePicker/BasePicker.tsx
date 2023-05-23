import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useRef,
} from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Input from "../Input";
import useRootClose from "../hooks/useRootClose";
import { usePopper } from "react-popper";
import useMergedRef from "../hooks/useMergeRef";
import { HiOutlineCalendar } from "react-icons/hi";
import CloseButton from "../CloseButton";
import { Size } from "../utils/constant";
import { FieldInputProps, FormikProps } from "formik";

dayjs.extend(localizedFormat);

export type BasePickerProps = Partial<{
  children: ReactNode;
  className: string;
  clearButton: ReactNode;
  clearButtonLabel: ReactNode;
  clearable: boolean;
  disabled: boolean;
  dropdownOpened: boolean;
  dateViewCount: number;
  field: FieldInputProps<string>;
  form: FormikProps<any>;
  inputLabel: string;
  inputPrefix: ReactNode;
  inputSuffix: ReactNode;
  inputtable: boolean;
  name: string;
  onBlur: FocusEventHandler;
  onChange: (date: dayjs.ConfigType) => void;
  onClear: MouseEventHandler;
  onDropdownClose: () => void;
  onDropdownOpen: () => void;
  onFocus: FocusEventHandler;
  onKeyDown: KeyboardEventHandler;
  placeholder: string;
  setDropdownOpened: (value: boolean) => void;
  size: Size;
  style: React.CSSProperties;
  type: string;
}>;

const BasePicker = forwardRef<HTMLInputElement, BasePickerProps>(
  (props, ref) => {
    const {
      children,
      className,
      clearButton,
      clearable = true,
      disabled,
      dropdownOpened,
      field,
      form,
      inputLabel = "",
      inputPrefix,
      inputSuffix = <HiOutlineCalendar className="text-lg" />,
      inputtable,
      name,
      onBlur,
      onChange,
      onClear,
      onDropdownClose,
      onDropdownOpen,
      onFocus,
      onKeyDown,
      placeholder,
      setDropdownOpened,
      size,
      type,
    } = props;

    const handleInputClick = () => {
      !inputtable ? toggleDropdown() : openDropdown();
    };

    const closeDropdown = () => {
      setDropdownOpened?.(false);
      onDropdownClose?.();
    };

    const suffixIconSlot = clearable ? (
      <div onClick={onClear}>
        {clearButton || <CloseButton className="text-base" />}
      </div>
    ) : (
      <>{inputSuffix}</>
    );

    const toggleDropdown = () => {
      setDropdownOpened?.(!dropdownOpened);
      !dropdownOpened ? onDropdownOpen?.() : onDropdownClose?.();
    };

    const openDropdown = () => {
      setDropdownOpened?.(true);
      onDropdownOpen?.();
    };

    const handleKeyDown: KeyboardEventHandler = (event) => {
      typeof onKeyDown === "function" && onKeyDown(event);
      if ((event.key === "Space" || event.key === "Enter") && !inputtable) {
        event.preventDefault();
        openDropdown();
      }
    };

    const handleInputBlur: FocusEventHandler = (event) => {
      typeof onBlur === "function" && onBlur(event);
      if (inputtable) {
        closeDropdown();
      }
    };

    const handleInputFocus: FocusEventHandler = (event) => {
      typeof onFocus === "function" && onFocus(event);
      if (inputtable) {
        openDropdown();
      }
    };

    const referenceRef = useRef(null);
    const popperRef = useRef(null);

    const { styles, attributes } = usePopper(
      referenceRef.current,
      popperRef.current,
      {
        placement: "bottom-start",
        modifiers: [
          {
            name: "offset",
            enabled: true,
            options: {
              offset: [0, 10],
            },
          },
        ],
      },
    );

    useRootClose(() => closeDropdown(), {
      triggerTarget: referenceRef,
      overlayTarget: popperRef,
      disabled: !dropdownOpened,
    });

    return (
      <>
        <Input
          form={form}
          field={field}
          className={className}
          placeholder={placeholder}
          ref={useMergedRef(ref, referenceRef)}
          size={size}
          name={name}
          value={inputLabel}
          readOnly={!inputtable}
          suffix={suffixIconSlot}
          prefix={inputPrefix}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onChange={() => onChange?.(field?.value)}
          autoComplete="off"
          type={type}
          disabled={disabled}
        />
        <div
          className="picker"
          ref={popperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {dropdownOpened && <div className="picker-panel">{children}</div>}
        </div>
      </>
    );
  },
);

export default BasePicker;
