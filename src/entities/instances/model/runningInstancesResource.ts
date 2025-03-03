import { createSignal } from 'solid-js';

import { listProcess } from '../api';
import type { MinecraftProcessMetadata } from './process';

const [runningInstancesData, setRunningInstancesData] = createSignal<
  MinecraftProcessMetadata[]
>([]);

const fetchRunningInstancesData = async () => {
  try {
    setRunningInstancesData(await listProcess());
  } catch {
    console.error("Can't get running instances");
  }
};

export const initializeRunningInstances = fetchRunningInstancesData;

export const useRunningInstances = () => runningInstancesData;

export const refetchRunningInstances = fetchRunningInstancesData;

// export const createRunningInstanceDataResource = (id: Accessor<string>) =>
//   createResource(id, (id) => {
//     try {
//       return getInstanceProcess(id);
//     } catch {
//       console.error("Can't get running instance");
//     }
//   });
