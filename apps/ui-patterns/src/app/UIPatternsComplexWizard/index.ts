export { default } from './UIPatternsComplexWizard';
export {
  default as useWizardValues,
  UIWizardProvider,
} from './useWizardValues';

export type UIWizardComplexField = {
  name: string;
  include?: boolean;
}

export type UIWizardSchema = {
  valueOne: string;
  valueTwo: string;
  valueThree: string;
  valueFour: number;
  fieldArray: Array<UIWizardComplexField>
}

export type UIWizardExtra = {
  extraOne: string;
  extraTwo: string;
  memo: string;
}

// An adapter type for mapping additional values to @tacc/core-wrappers/Wizard
export type UIWizardStep = {
  id: string;
  name: string;
  render: React.ReactNode;
  summary: React.ReactNode;
  // A generator for initial values that requires extra values
  generateInitialValues: (
    extra: UIWizardExtra
  ) => Partial<UIWizardSchema>;
  // A custom validator thunk for a step that requires extra values
  // (This returns a custom validation function)
  validateThunk?: (
    extra: UIWizardExtra
  ) => (values: Partial<UIWizardSchema>) => any;
  validationSchema: any;
};