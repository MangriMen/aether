import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';

export const IS_DEBUG_KEY = '_AETHER_DEBUG';
export const IS_DEVELOPER_MODE_KEY = '_AETHER_DEVELOPER_MODE';

export const [isDebug, setIsDebug] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createSignal(false),
  {
    name: IS_DEBUG_KEY,
  },
);

export const [isDeveloperMode, setIsDeveloperMode] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createSignal(false),
  { name: IS_DEVELOPER_MODE_KEY },
);
