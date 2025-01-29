import { initializeState } from '@/entities/minecrafts';

import { AetherNamespaceName, AetherNamespaceObject } from '../model';

export const initializeHandlers = () => {
  window[AetherNamespaceName] = AetherNamespaceObject;
};

export const initializeApp = async () => {
  initializeHandlers();
  await initializeState();
};
