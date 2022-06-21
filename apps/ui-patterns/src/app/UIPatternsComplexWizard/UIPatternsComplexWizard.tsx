/**
 * UIPatternsComplexWizard.tsx
 *
 * Example of how to create a wizard that supports extra values passed in (possibly via hook)
 * that are used in initial value generation and custom step validation. This also includes
 * examples of how to use Field Arrays in Formik
 */
import React, { useCallback, useMemo } from 'react';
import useWizardValues, { UIWizardProvider } from './useWizardValues';
import { UIWizardStep, UIWizardSchema, UIWizardExtra } from '.';
import { Wizard, WizardStep } from '@tacc/core-wrappers';
import wizardSteps from './steps';

export const UIPatternsComplexWizardRender: React.FC<{
  wizardSteps: Array<UIWizardStep>;
}> = ({ wizardSteps }) => {
  const { add, extra } = useWizardValues();

  // The submit button rendered by the Wizard should add values to the
  // wizard value context
  const formSubmit = useCallback(
    (value: Partial<UIWizardSchema>) => {
      add(value);
    },
    [add]
  );

  // Map Array of UIWizardSteps into an array of @tacc/core-wrappers/WizardStep
  const steps: Array<WizardStep<UIWizardSchema>> = useMemo(() => {
    return wizardSteps.map((jobStep) => {
      const { generateInitialValues, validateThunk, ...stepProps } = jobStep;
      return {
        // Call the step's custom initial value generator to pass in the extra hook values
        initialValues: generateInitialValues(extra),
        // generate a validation function from the UIWizardSteps's validateThunk, given the current extra hook values
        validate: validateThunk ? validateThunk(extra) : undefined,
        ...stepProps,
      };
    });
  }, [extra]);

  return (
    <Wizard steps={steps} memo={`${extra.memo}`} formSubmit={formSubmit} />
  );
};

const UIPatternsComplexWizard: React.FC = () => {
  const defaultValues: Partial<UIWizardSchema> = {};
  const extra: UIWizardExtra = {
    extraOne: 'extra value one',
    extraTwo: 'extra value two',
    memo: 'wizard.memo',
  };
  return (
    <UIWizardProvider value={{ defaultValues, extra }}>
      <UIPatternsComplexWizardRender wizardSteps={wizardSteps} />
    </UIWizardProvider>
  );
};

export default UIPatternsComplexWizard;
