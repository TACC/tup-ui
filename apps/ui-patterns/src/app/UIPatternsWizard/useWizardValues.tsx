/**
 * useWizardValues.tsx
 *
 * Context and provider for holding the form schema
 */

import { UIWizardSchema } from '.';
import { withBuilder } from '@tacc/core-wrappers';

// Use the withBuilder Higher Order Component to generate a context and provider
const { useBuilderContext, Provider } = withBuilder<UIWizardSchema>();

// Create a custom hook that provides the withBuilder methods along with the external values
export const useWizardValues = useBuilderContext;

export const UIWizardProvider = Provider;

export default useWizardValues;
