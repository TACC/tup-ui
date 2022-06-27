import { FormikInput } from '@tacc/core-wrappers';
import { WizardStep } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { useWizardValues, UIWizardSchema } from '..';

export const StepTwo: React.FC = () => {
  return (
    <div>
      <h2>Step Two</h2>
      <FormikInput
        name="fieldThree"
        required={true}
        label="Field Three"
        description="The third form field"
      />
    </div>
  );
};

export const StepTwoSummary: React.FC = () => {
  // Retrieve the current values in the wizard to render a summary
  const { data } = useWizardValues();
  return (
    <ul>
      <li>Field Three: {data.fieldThree}</li>
    </ul>
  );
};

// Form steps require a validation schema
export const validationSchema = Yup.object({
  fieldThree: Yup.string().required().min(1).max(64),
});

const stepTwo: WizardStep<UIWizardSchema> = {
  id: 'stepTwo',
  name: 'Step Two',
  render: <StepTwo />,
  summary: <StepTwoSummary />,
  initialValues: {},
  validationSchema,
};

export default stepTwo;
