import { FormikInput } from '@tacc/core-wrappers';
import { WizardStep } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { useWizardValues, UIWizardSchema } from '..';

export const StepOne: React.FC = () => {
  return (
    <div>
      <h2>Step One</h2>
      <FormikInput
        name="fieldOne"
        required={true}
        label="Name"
        description="The first form field"
      />
      <FormikInput
        name="fieldTwo"
        required={false}
        label="Description"
        description="The second form field"
      />
    </div>
  );
};

export const StepOneSummary: React.FC = () => {
  // Retrieve the current values in the wizard to render a summary
  const { data } = useWizardValues();
  return (
    <ul>
      <li>Field One: {data.fieldOne}</li>
      <li>Field Two: {data.fieldTwo}</li>
    </ul>
  );
};

// Form steps require a validation schema
const validationSchema = Yup.object({
  fieldOne: Yup.string().required().min(1).max(64),
  fieldTwo: Yup.string(),
});

const stepOne: WizardStep<UIWizardSchema> = {
  id: 'start',
  name: 'Job Name',
  render: <StepOne />,
  summary: <StepOneSummary />,
  initialValues: {},
  validationSchema,
};

export default stepOne;
