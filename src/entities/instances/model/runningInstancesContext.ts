import { createContext, useContext } from 'solid-js';

import type { Instance } from './instance';
import type { ProcessPayload } from '@/entities/events/@x/instances';

export type RunningInstancesInstanceData = {
  payload?: ProcessPayload;
  isLoading: boolean;
  isRunning: boolean;
};

export type RunningInstancesContextValue = [
  {
    instances: Record<Instance['id'], RunningInstancesInstanceData | undefined>;
  },
  {
    get: (
      context: RunningInstancesContextValue[0],
      id: Instance['id'],
    ) => RunningInstancesInstanceData | undefined;
    setIsLoading: (id: Instance['id'], value: boolean) => void;
  },
];

const DEFAULT_VALUE: RunningInstancesContextValue = [
  { instances: {} },
  {
    get: (_context: RunningInstancesContextValue[0], _id: Instance['id']) =>
      undefined,
    setIsLoading: (_id: Instance['id'], _value: boolean) => undefined,
  },
];

export const RunningInstancesContext = createContext(DEFAULT_VALUE);

export const useRunningInstancesContext = () => {
  const value = useContext(RunningInstancesContext);

  if (!value) {
    throw new Error('Missing context Provider');
  }

  return value;
};
