export { default } from './UIPatternsComplexWizard';
export {
  default as useWizardValues,
  UIWizardProvider,
} from './useWizardValues';

export type UIWizardComplexField = {
  name: string;
  include?: boolean;
};

export type UIWizardArrayOfComplexFields = {
  name: string;
  fieldArray: Array<UIWizardComplexField>;
};

export type UIWizardSchema = {
  fieldOne: string;
  fieldTwo: string;
  fieldThree: string;
  fieldFour: number;
  fieldArray: Array<UIWizardComplexField>;
  fieldArrayOfArrays: Array<UIWizardArrayOfComplexFields>;
};

export type UIWizardExtra = {
  extraOne: string;
  extraTwo: string;
  memo: string;
};

// An adapter type for mapping additional values to @tacc/core-wrappers/Wizard
export type UIWizardStep = {
  id: string;
  name: string;
  render: React.ReactNode;
  summary: React.ReactNode;
  // A generator for initial values that requires extra values
  generateInitialValues: (extra: UIWizardExtra) => Partial<UIWizardSchema>;
  // A custom validator thunk for a step that requires extra values
  // (This returns a custom validation function)
  validateThunk?: (
    extra: UIWizardExtra
    /* eslint-disable-next-line */
  ) => (values: Partial<UIWizardSchema>) => any;
  /* eslint-disable-next-line */
  validationSchema: any;
};
