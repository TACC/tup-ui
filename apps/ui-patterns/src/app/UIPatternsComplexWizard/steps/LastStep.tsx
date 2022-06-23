import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import {
  UIWizardStep,
  UIWizardSchema,
  UIWizardExtra,
  InitialValueGenerator,
} from '..';
import { Button } from '@tacc/core-components';
import { SubmitWrapper } from '@tacc/core-wrappers';

export const LastStep: React.FC = () => {
  const [submitResult, setSubmitResult] = useState({
    data: undefined as undefined | string,
    isLoading: false,
    error: null,
  });

  const onSubmit = useCallback(() => {
    setSubmitResult({ data: 'Submitted!', isLoading: false, error: null });
  }, [setSubmitResult]);
  const { error, data, isLoading } = submitResult;
  return (
    <div>
      <h2>Last Step</h2>
      <div>
        <SubmitWrapper error={error} isLoading={isLoading} success={data}>
          <Button type="primary" onClick={onSubmit} size="long">
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
