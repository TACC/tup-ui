import React from 'react';
import { FormGroup } from 'reactstrap';
import { Collapse, Button } from '@tacc/core-components';
import { FieldArray, useFormikContext, FieldArrayRenderProps } from 'formik';
import { FormikInput, FormikCheck } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import fieldArrayStyles from './FieldArray.module.css';
import {
  UIWizardComplexField,
  UIWizardSchema,
  UIWizardStep,
  UIWizardArrayOfComplexFields,
  useWizardValues,
  InitialValueGenerator
} from '..';

type UIWizardComplexFieldRenderProps = {
  item: UIWizardComplexField;
  innerIndex: number;
  innerKey: string;
  remove: (index: number) => UIWizardComplexField | undefined;
};

// A component for rendering an individual field
const UIWizardComplexFieldRender: React.FC<UIWizardComplexFieldRenderProps> = ({
  item,
  innerIndex,
  innerKey,
  remove,
}) => {
  return (
    <Collapse
      title="Complex Field"
      note="more values inside"
      className={fieldArrayStyles.item}
    >
      <FormikInput
        name={`${innerKey}.name`}
        label="Name"
        required={true}
        description="Name field of this object"
      />
      <FormikCheck
        name={`${innerKey}.include`}
        label="Include"
        required={false}
        description="Include field of this object"
      />
      <Button onClick={() => remove(innerIndex)} size="small">
        Remove Inner Item
      </Button>
    </Collapse>
  );
};

export type FieldWrapperInnerRenderProps = {
  outerIndex: number;
  arrayHelpers: FieldArrayRenderProps;
};

const FieldArrayInnerRender: React.FC<FieldWrapperInnerRenderProps> = ({
  outerIndex,
  arrayHelpers,
}) => {
  const { values } = useFormikContext();
  const outerItem =
    (values as Partial<UIWizardSchema>).fieldArrayOfArrays ?? [];
  const innerItems = outerItem[outerIndex].fieldArray ?? [];

  return (
    <FormGroup>
      <div>
        {innerItems.map((item, innerIndex) => {
          const innerKey = `fieldArrayOfArrays.${outerIndex}.fieldArray.${innerIndex}`;
          return (
            <div key={innerKey}>
              <UIWizardComplexFieldRender
                item={item}
                innerKey={innerKey}
                innerIndex={innerIndex}
                remove={arrayHelpers.remove}
              />
            </div>
          );
        })}
      </div>
      <div>
        <Button
          size="small"
          onClick={() =>
            arrayHelpers.push({ name: 'new inner item', include: false })
          }
        >
          + Add Inner Item
        </Button>
      </div>
    </FormGroup>
  );
};

type FieldArrayOfArraysRenderProps = {
  outerItem: UIWizardArrayOfComplexFields;
  outerIndex: number;
  remove: (index: number) => UIWizardArrayOfComplexFields | undefined;
};

const OuterItemRender: React.FC<FieldArrayOfArraysRenderProps> = ({
  outerItem,
  outerIndex,
  remove,
}) => {
  return (
    <Collapse
      title={`Field Array ${outerIndex}`}
      className={fieldArrayStyles.item}
    >
      <FormikInput
        name={`fieldArrayOfArrays.${outerIndex}.name`}
        label="Name"
        required={true}
        description="Name of collection of complex items"
      />
      <FieldArray
        name={`fieldArrayOfArrays.${outerIndex}.fieldArray`}
        render={(arrayHelpers) => (
          <FieldArrayInnerRender
            outerIndex={outerIndex}
            arrayHelpers={arrayHelpers}
          />
        )}
      />
      <Button onClick={() => remove(outerIndex)} size="small">
        Remove Outer Item
      </Button>
    </Collapse>
  );
};

const StepThreeRender: React.FC<{ arrayHelpers: FieldArrayRenderProps }> = ({
  arrayHelpers,
}) => {
  const { values } = useFormikContext();

  const fieldArrayOfArrays: Array<UIWizardArrayOfComplexFields> =
    (values as Partial<UIWizardSchema>)?.fieldArrayOfArrays ?? [];

  return (
    <Collapse
      open={fieldArrayOfArrays.length > 0}
      title="Field Array of Arrays"
      note={`${fieldArrayOfArrays.length} items`}
      className={fieldArrayStyles.array}
    >
      <div className={fieldArrayStyles.description}>
        These File Input Arrays will be submitted with your job.
      </div>
      {fieldArrayOfArrays.map((outerItem, index) => (
        <OuterItemRender
          outerItem={outerItem}
          outerIndex={index}
          remove={arrayHelpers.remove}
          key={`fieldArrayOfArrays.${index}`}
        />
      ))}
      <Button
        onClick={() =>
          arrayHelpers.push({ name: 'new outer array', fieldArray: [] })
        }
        size="small"
      >
        + Add Outer Array
      </Button>
    </Collapse>
  );
};

export const StepThree: React.FC = () => {
  return (
    <div>
      <h2>Field Array of Field Arrays</h2>
      <FieldArray
        name="fieldArrayOfArrays"
        render={(arrayHelpers) => {
          return <StepThreeRender arrayHelpers={arrayHelpers} />;
        }}
      />
    </div>
  );
};

export const StepThreeSummary: React.FC = () => {
  const { values } = useWizardValues();
  return(
    <div>
      {values.fieldArrayOfArrays?.map(
        (outerItem) => (
          <div>
            <div>
              {outerItem.name}
            </div>
            <ul>
              {outerItem.fieldArray.map(
                (innerItem) => (
                  <li>{innerItem.name}</li>
                )
              )}
            </ul>
          </div>
        )
      )}
    </div>
  )
};

const validationSchema = Yup.object().shape({
  fieldArrayOfArrays: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .min(1)
        .required('A name for the outer item is required'),
      fieldArray: Yup.array(
        Yup.object().shape({
          name: Yup.string().min(1).required('A name for the inner item is required'),
          include: Yup.boolean(),
        })
      ),
    })
  ),
});

const generateInitialValues: InitialValueGenerator = ({ values, extra }) => ({
  fieldArrayOfArrays: values.fieldArrayOfArrays ?? [
    {
      name: 'outer item',
      fieldArray: [{ name: 'inner item', include: true }],
    },
  ]
})

const step: UIWizardStep = {
  id: 'stepThree',
  name: 'Step Three',
  render: <StepThree />,
  summary: <StepThreeSummary />,
  validationSchema,
  generateInitialValues
};

export default step;
