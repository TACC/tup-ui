/**
 * useWizardValues.tsx
 *
 * Example of how to create a custom context for a wizard with extra
 * values that are not part of the form schema, but required for rendering
 * the Wizard or calculating default values
 */

import React, { useContext } from 'react';
import { UIWizardSchema } from '.';
import { withBuilder } from '@tacc/core-wrappers';

// Use the withBuilder Higher Order Component to generate a context and provider
const { useBuilderContext, Provider } = withBuilder<UIWizardSchema>();

// Create a custom hook that provides the withBuilder methods along with the external values
export const useWizardValues = useBuilderContext;

export const UIWizardProvider = Provider;

export default useWizardValues;
