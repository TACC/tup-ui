/**
 * StepTwo.tsx
 *
 * This step demonstrates how to implement a Formik FieldArray. Field arrays are lists
 * of objects that can be appended or removed.
 */
import React from 'react';
import { Button } from '@tacc/core-components';
import fieldArrayStyles from './FieldArray.module.css';
import { Collapse } from '@tacc/core-components';
import { FieldArray, useFormikContext, FieldArrayRenderProps } from 'formik';
import { FormikInput, FormikCheck } from '@tacc/core-wrappers';
import {
  UIWizardStep,
  UIWizardComplexField,
  UIWizardSchema,
  useWizardValues,
} from '..';
import * as Yup from 'yup';

type UIWizardComplexFieldProps = {
  item: UIWizardComplexField;
  index: number;
  remove: (index: number) => UIWizardComplexField | undefined;
};

// A component for rendering an individual field
const UIWizardComplexFieldRender: React.FC<UIWizardComplexFieldProps> = ({
  item,
  index,
  remove,
}) => {
  return (
    <Collapse
      title="Complex Field"
      note="more values inside"
      className={fieldArrayStyles.item}
    >
      <FormikInput
        name={`fieldArray.${index}.name`}
        label="Name"
        required={true}
        description="Name field of this object"
      />
      <FormikCheck
        name={`fieldArray.${index}.include`}
        label="Include"
        required={false}
        description="Include field of this object"
      />
      <Button onClick={() => remove(index)} size="small">
        Remove
      </Button>
    </Collapse>
  );
};

// A component that renders the items in the field array
const StepTwoRender: React.FC<{ arrayHelpers: FieldArrayRenderProps }> = ({
  arrayHelpers,
}) => {
  const { values } = useFormikContext();
  const fieldArray = (values as Partial<UIWizardSchema>)?.fieldArray ?? [];

  return (
    <Collapse
      open={fieldArray.length > 0}
      title="Field Array"
      note={`${fieldArray.length} items`}
      isCollapsable={fieldArray.length === 0}
      className={fieldArrayStyles.array}
    >
      <div className={fieldArrayStyles.description}>
        A list of complex fields, where each object has multiple fields
      </div>
      {fieldArray.map((field, index) => (
        <UIWizardComplexFieldRender
          key={`fieldArray.${index}`}
          item={field}
          index={index}
          remove={arrayHelpers.remove}
        />
      ))}
      <Button
        onClick={() => arrayHelpers.push({ name: 'new item', include: true })}
        size="small"
      >
        + Add Item
      </Button>
    </Collapse>
  );
};

// A step that renders the field array wrapper
export const StepTwo: React.FC = () => {
  return (
    <div>
      <h2>Field Array</h2>
      <FieldArray
        name="fieldArray"
        render={(arrayHelpers) => {
          return <StepTwoRender arrayHelpers={arrayHelpers} />;
        }}
      />
    </div>
  );
};

export const StepTwoSummary: React.FC = () => {
  const { values } = useWizardValues();
  const fields = values.fieldArray ?? [];
  return (
    <div key="file-inputs-summary">
      {fields.map((field) => (
        <div>{field.name}</div>
      ))}
    </div>
  );
};

const validationSchema = Yup.object().shape({
  fieldArray: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().min(1).required('A name is required'),
      include: Yup.boolean(),
    })
  ),
});

const step: UIWizardStep = {
  id: 'stepTwo',
  name: 'Step Two',
  render: <StepTwo />,
  summary: <StepTwoSummary />,
  validationSchema,
  generateInitialValues: (extra) => ({
    fieldArray: [{ name: 'item one', include: true }],
  }),
};

export default step;
