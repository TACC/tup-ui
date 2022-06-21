import { FormikInput } from '@tacc/core-wrappers';
import { WizardStep } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { useWizardValues, UIWizardSchema } from '..';

export const StepThree: React.FC = () => {
  return (
    <div>
      <h2>Step Three</h2>
      <FormikInput
        name="fieldFour"
        required={true}
        label="Field Four"
        description="The fourth form field"
      />
    </div>
  );
};

export const StepThreeSummary: React.FC = () => {
  // Retrieve the current values in the wizard to render a summary
  const { data } = useWizardValues();
  return (
    <ul>
      <li>Field Four: {data.fieldFour}</li>
    </ul>
  );
};

// Form steps require a validation schema
const validationSchema = Yup.object({
  fieldThree: Yup.string().required().min(1).max(64),
});

const stepThree: WizardStep<UIWizardSchema> = {
  id: 'stepThree',
  name: 'Step Three',
  render: <StepThree />,
  summary: <StepThreeSummary />,
  initialValues: {},
  validationSchema,
};

export default stepThree;
