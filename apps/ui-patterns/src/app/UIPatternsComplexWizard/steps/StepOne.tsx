import { FormikInput } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import {
  UIWizardStep,
  useWizardValues,
  UIWizardSchema,
  UIWizardExtra,
} from '..';

export const StepOne: React.FC = () => {
  const { extra } = useWizardValues();
  return (
    <div>
      <h2>Step One: Extra value two is {extra.extraTwo}</h2>
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
  const { values } = useWizardValues();
  return (
    <ul>
      <li>Field One: {values.fieldOne}</li>
      <li>Field Two: {values.fieldTwo}</li>
    </ul>
  );
};

const generateInitialValues = (
  extra: UIWizardExtra
): Partial<UIWizardSchema> => ({
  // Use the extra values provided to generate an initial value
  fieldOne: extra.extraOne,
});

// Form steps require a validation schema
const validationSchema = Yup.object({
  stepOne: Yup.string().required().min(1).max(64),
  stepTwo: Yup.string(),
});

const stepOne: UIWizardStep = {
  id: 'start',
  name: 'Job Name',
  render: <StepOne />,
  summary: <StepOneSummary />,
  generateInitialValues,
  validationSchema,
};

export default stepOne;
