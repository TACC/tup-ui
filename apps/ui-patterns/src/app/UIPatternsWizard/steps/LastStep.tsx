import React, { useCallback, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { UIWizardSchema, useWizardValues } from '..';
import { Button } from '@tacc/core-components';
import { SubmitWrapper } from '@tacc/core-wrappers';
import { WizardStep } from '@tacc/core-wrappers';
import { validationSchema as stepOneValidationSchema } from './StepOne';
import { validationSchema as stepTwoValidationSchema } from './StepTwo';
import { validationSchema as stepThreeValidationSchema } from './StepThree';

export const LastStep: React.FC = () => {
  const [submitResult, setSubmitResult] = useState({
    data: undefined as undefined | string,
    isLoading: false,
    error: null,
  });

  const { data: formData } = useWizardValues();

  const onSubmit = useCallback(() => {
    setSubmitResult({ data: 'Submitted!', isLoading: false, error: null });
  }, [setSubmitResult]);

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

// Form steps require a validation schema
export const validationSchema = Yup.object({});

const lastStep: WizardStep<UIWizardSchema> = {
  id: 'stepLast',
  name: 'Last Step',
  render: <LastStep />,
  summary: <LastStepSummary />,
  initialValues: {},
  validationSchema,
};

export default lastStep;
