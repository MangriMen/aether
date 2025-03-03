import { invoke } from '@tauri-apps/api/core';

import type {
  ImportHandler,
  Instance,
  InstanceCreateDto,
  InstanceEditDto,
  InstanceFile,
  InstanceImportDto,
  MinecraftProcessMetadata,
} from '../model';

const PLUGIN_INSTANCE_PREFIX = 'plugin:instance|';

const PLUGIN_PROCESS_PREFIX = 'plugin:process|';

export const createInstance = (instanceCreateDto: InstanceCreateDto) =>
  invoke<string>(`${PLUGIN_INSTANCE_PREFIX}instance_create`, {
    instanceCreateDto,
  });

export const installInstance = (id: Instance['id'], force: boolean = false) =>
  invoke(`${PLUGIN_INSTANCE_PREFIX}instance_install`, { id, force });

export const updateInstance = (id: Instance['id']) =>
  invoke(`${PLUGIN_INSTANCE_PREFIX}instance_update`, { id });

export const importInstance = (instanceImportDto: InstanceImportDto) =>
  invoke<string>(`${PLUGIN_INSTANCE_PREFIX}instance_import`, {
    instanceImportDto,
  });

export const getImportConfigs = () =>
  invoke<ImportHandler[]>(
    `${PLUGIN_INSTANCE_PREFIX}instance_get_import_configs`,
  );

export const listInstances = () =>
  invoke<[Instance[], string[]]>(`${PLUGIN_INSTANCE_PREFIX}instance_list`);

export const getInstance = (id: Instance['id']) =>
  invoke<Instance>(`${PLUGIN_INSTANCE_PREFIX}instance_get`, { id });

export const launchInstance = (id: Instance['id']) =>
  invoke(`${PLUGIN_INSTANCE_PREFIX}instance_launch`, { id });

export const stopInstance = (uuid: string) =>
  invoke(`${PLUGIN_INSTANCE_PREFIX}instance_stop`, { uuid });

export const removeInstance = (id: Instance['id']) =>
  invoke(`${PLUGIN_INSTANCE_PREFIX}instance_remove`, { id });

export const editInstance = async (
  id: Instance['id'],
  instanceEditDto: InstanceEditDto,
) => invoke(`${PLUGIN_INSTANCE_PREFIX}instance_edit`, { id, instanceEditDto });

export const getInstanceContents = (id: string) =>
  invoke<Record<string, InstanceFile>>(
    `${PLUGIN_INSTANCE_PREFIX}instance_get_contents`,
    { id },
  );

export const toggleDisableInstanceContent = (id: string, contentPath: string) =>
  invoke(`${PLUGIN_INSTANCE_PREFIX}instance_toggle_disable_content`, {
    id,
    contentPath,
  });

export const removeInstanceContent = (id: string, contentPath: string) =>
  invoke(`${PLUGIN_INSTANCE_PREFIX}instance_remove_content`, {
    id,
    contentPath,
  });

// Utils
export const revealInExplorer = (path: string, exact = true) =>
  invoke('reveal_in_explorer', { path, exact });

// Process
export const listProcess = () =>
  invoke<MinecraftProcessMetadata[]>(`${PLUGIN_PROCESS_PREFIX}process_list`);

export const getInstanceProcess = (id: string) =>
  invoke<MinecraftProcessMetadata[]>(
    `${PLUGIN_PROCESS_PREFIX}process_get_by_instance_id`,
    {
      id,
    },
  );
