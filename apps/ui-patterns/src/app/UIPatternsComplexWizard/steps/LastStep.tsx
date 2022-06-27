import React, { useCallback, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { UIWizardStep, UIWizardSchema, InitialValueGenerator } from '..';
import { Button } from '@tacc/core-components';
import { SubmitWrapper } from '@tacc/core-wrappers';
import { validationSchema as stepOneValidationSchema } from './StepOne';
import { validationSchema as stepTwoValidationSchema } from './StepTwo';
import { validationSchema as stepThreeValidationSchema } from './StepThree';
import { useWizardValues } from '../../UIPatternsWizard';

export const LastStep: React.FC = () => {
  const [submitResult, setSubmitResult] = useState({
    data: undefined as undefined | string,
    isLoading: false,
    error: null,
  });

  const onSubmit = useCallback(() => {
    setSubmitResult({ data: 'Submitted!', isLoading: false, error: null });
  }, [setSubmitResult]);

  const { data: formData } = useWizardValues();

  const valid = useMemo(() => {
    try {
      const concatSchema = [
        stepOneValidationSchema,
        stepTwoValidationSchema,
        stepThreeValidationSchema,
      ].reduce((previous, current) => previous.concat(current), Yup.object());
      return concatSchema.validateSync(formData);
    } catch {
      return false;
    }
  }, [formData]);

  const { error, data, isLoading } = submitResult;
  return (
    <div>
      <h2>Last Step</h2>
      <div>
        <SubmitWrapper error={error} isLoading={isLoading} success={data}>
          <Button
            type="primary"
            onClick={onSubmit}
            size="long"
            disabled={!valid}
          >
            Submit
          </Button>
        </SubmitWrapper>
      </div>
    </div>
  );
};

export const LastStepSummary: React.FC = () => {
  return null;
};

const generateInitialValues: InitialValueGenerator =
  (): Partial<UIWizardSchema> => ({});

// Form steps require a validation schema
const validationSchema = Yup.object({});

const lastStep: UIWizardStep = {
  id: 'stepLast',
  name: 'Last Step',
  render: <LastStep />,
  summary: <LastStepSummary />,
  generateInitialValues,
  validationSchema,
};

export default lastStep;
