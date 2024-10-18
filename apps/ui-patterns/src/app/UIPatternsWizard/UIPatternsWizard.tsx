/**
 * UIPatternsComplexWizard.tsx
 *
 * Example of how to create a wizard that supports extra values passed in (possibly via hook)
 * that are used in initial value generation and custom step validation. This also includes
 * examples of how to use Field Arrays in Formik
 */
import React, { useCallback } from 'react';
import { UIWizardSchema } from '.';
import { UIWizardProvider, useWizardValues } from '.';
import { Wizard } from '@tacc/core-components';
import wizardSteps from './steps';

const UIPatternsWizardRender: React.FC = () => {
  const { add } = useWizardValues();
  const formSubmit = useCallback(
    (value: Partial<UIWizardSchema>) => {
      add(value);
    },
    [add]
  );

  return <Wizard steps={wizardSteps} formSubmit={formSubmit} />;
};

const UIPatternsWizard: React.FC = () => {
  const defaultValues: Partial<UIWizardSchema> = {};
  return (
    <UIWizardProvider value={defaultValues}>
      <UIPatternsWizardRender />
    </UIWizardProvider>
  );
};

export default UIPatternsWizard;
