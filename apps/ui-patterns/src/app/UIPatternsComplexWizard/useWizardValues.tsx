/**
 * useWizardValues.tsx
 *
 * Example of how to create a custom context for a wizard with extra
 * values that are not part of the form schema, but required for rendering
 * the Wizard or calculating default values
 */

import React, { useContext } from 'react';
import { UIWizardSchema, UIWizardExtra } from '.';
import { withBuilder } from '@tacc/core-components';

// A React context for the external values
const UIWizardContext = React.createContext<UIWizardExtra>({
  extraOne: 'extra value one',
  extraTwo: 'extra value two',
  memo: 'memo.value',
});

// Use the withBuilder Higher Order Component to generate a context and provider
const { useBuilderContext, Provider } = withBuilder<UIWizardSchema>();

// Create a custom hook that provides the withBuilder methods along with the external values
export const useWizardValues = () => {
  const { data, add, set, clear } = useBuilderContext();
  const extra = useContext(UIWizardContext);
  return {
    values: data,
    add,
    set,
    clear,
    extra,
  };
};

// The custom UIWizardContext requires a corresponding provider
type UIWizardProviderProps = {
  value: {
    defaultValues: Partial<UIWizardSchema>;
    extra: UIWizardExtra;
  };
};

// The wizard context wraps the HOC generated Provider
export const UIWizardProvider: React.FC<
  React.PropsWithChildren<UIWizardProviderProps>
> = ({ value, children }) => {
  const { defaultValues, extra } = value;
  return (
    <UIWizardContext.Provider value={extra}>
      {Provider({ value: defaultValues, children })}
    </UIWizardContext.Provider>
  );
};

export default useWizardValues;
