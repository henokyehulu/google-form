import React from "react";
import { TextField } from "@mui/material";
import { type FieldHookConfig, useField } from "formik";
import type { FieldConfig } from "formik";
import { RiErrorWarningFill as ErrorIcon } from "react-icons/ri";

interface InputFieldProps extends FieldConfig {
  label: string;
}

const InputField: React.FC<InputFieldProps & FieldHookConfig<string>> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-1">
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        {...field}
        type={props.type}
        error={meta.touched && Boolean(meta.error)}
      />
      {meta.touched && meta.error ? (
        <div className="flex items-center gap-2 text-[#D93025]">
          <ErrorIcon className="h-4 w-4" />
          <span className="text-xs">{meta.error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default InputField;
