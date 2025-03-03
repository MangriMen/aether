export interface Plugin {
  enabled: boolean;
  metadata: PluginMetadata;
}

export interface PluginMetadata {
  plugin: PluginInfo;
  wasm: WasmInfo;
  config: ConfigInfo;
}

export interface PluginInfo {
  id: string;
  name: string;
  version: string;
  description?: string;
  authors?: string[];
  license?: string;
}

export interface WasmInfo {
  file: string;
  allowed_hosts?: string[];
  allowed_paths?: Array<[string, string]>;
}

export interface ConfigInfo {
  api_version: string;
}

export interface PluginSettings {
  allowed_hosts?: string[];
  allowed_paths?: Array<[string, string]>;
}
