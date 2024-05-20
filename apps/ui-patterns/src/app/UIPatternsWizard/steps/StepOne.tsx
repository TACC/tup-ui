import { FormikInput } from '@tacc/core-components';
import { WizardStep } from '@tacc/core-components';
import * as Yup from 'yup';
import { useWizardValues, UIWizardSchema } from '..';
import { Field } from 'formik';

export const StepOne: React.FC = () => {
  return (
    <div>
      <h2>Step One</h2>
      <Field
        component={FormikInput}
        name="fieldOne"
        required={true}
        label="Name"
        description="The first form field"
      />
      <Field
        component={FormikInput}
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
export const validationSchema = Yup.object({
  fieldOne: Yup.string().required().min(1).max(64),
  fieldTwo: Yup.string(),
});

const stepOne: WizardStep<UIWizardSchema> = {
  id: 'start',
  name: 'Job Name',
  render: <StepOne />,
  summary: <StepOneSummary />,
  initialValues: {
    fieldOne: 'default field one',
  },
  validationSchema,
};

export default stepOne;
