import React, { useState } from "react";
import { Form, Formik } from "formik";
import type { FormikConfig, FormikHelpers } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormNavigation from "./FormNavigation";
import type { FormStepProps } from "./FormStep";
import type { FormSchemaType } from "~/schemas/form.schema";

interface MultiStepFormProps extends FormikConfig<FormSchemaType> {
  children: React.ReactNode;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  children,
  initialValues,
  onSubmit,
}) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(
    children
  ) as React.ReactElement<FormStepProps>[];
  const [snapshot, setSnapshot] = useState(initialValues);
  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;
  const next = (values: FormSchemaType) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };
  const prev = (values: FormSchemaType) => {
    setSnapshot(values);
    setStepNumber(stepNumber - 1);
  };
  const handleSubmit = async (
    values: FormSchemaType,
    actions: FormikHelpers<FormSchemaType>
  ) => {
    if (step?.props.onSubmit) {
      void step.props.onSubmit();
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };
  return (
    <div>
      <Formik
        initialValues={snapshot}
        validationSchema={
          step
            ? toFormikValidationSchema(step.props.validationSchema)
            : undefined
        }
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            {step}
            <FormNavigation
              isLastStep={isLastStep}
              isSubmitting={formik.isSubmitting}
              hasPrevious={stepNumber > 0}
              onBackClick={() => prev(formik.values)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;
