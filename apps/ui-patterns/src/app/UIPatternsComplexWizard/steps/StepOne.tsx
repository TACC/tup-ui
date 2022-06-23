import { FormikInput } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import {
  UIWizardStep,
  useWizardValues,
  UIWizardSchema,
  InitialValueGenerator,
} from '..';

export const StepOne: React.FC = () => {
  const { extra } = useWizardValues();
  return (
    <div>
      <h2>Step One: Extra value two is {extra.extraTwo}</h2>
      <FormikInput
        name="fieldOne"
        required={true}
        label="Field One"
        description="The first form field"
      />
      <FormikInput
        name="fieldTwo"
        required={false}
        label="Field Two"
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

const generateInitialValues: InitialValueGenerator = ({ values, extra }) => ({
  fieldOne: values?.fieldOne ?? extra.extraOne,
});

// Form steps require a validation schema
const validationSchema = Yup.object({
  fieldOne: Yup.string().required().min(1).max(64),
  fieldTwo: Yup.string(),
});

const stepOne: UIWizardStep = {
  id: 'stepOne',
  name: 'Step One',
  render: <StepOne />,
  summary: <StepOneSummary />,
  generateInitialValues,
  validationSchema,
};

export default stepOne;
