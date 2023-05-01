import React from "react";
import type { ZodType, ZodTypeDef } from "zod";

export interface FormStepProps {
  stepName: string;
  className?: string;
  children: React.ReactNode;
  validationSchema: ZodType<unknown, ZodTypeDef, unknown>;
  onSubmit?: () => void;
}

const FormStep: React.FC<FormStepProps> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

export default FormStep;
