export interface Instance {
  id: string;
  path: string;

  name: string;
  iconPath?: string;

  installStage: InstanceInstallStage;

  // Main minecraft metadata
  gameVersion: string;
  loader: ModLoader;
  loaderVersion?: string;

  // Launch arguments
  javaPath?: string;
  extraLaunchArgs?: string[];
  customEnvVars?: { [key: string]: string };

  // Minecraft runtime settings
  memory?: MemorySettings;
  forceFullscreen?: boolean;
  gameResolution?: WindowSize;

  // Additional information
  created: Date;
  modified: Date;
  lastPlayed?: Date;

  timePlayed: number;
  recent_time_played: number;
}

export type WindowSize = [number, number];

export interface MemorySettings {
  maximum: number;
}

export enum InstanceInstallStage {
  /// Instance is installed
  Installed = 'installed',
  /// Instance's minecraft game is still installing
  Installing = 'installing',
  /// Instance created for pack, but the pack hasn't been fully installed yet
  PackInstalling = 'pack_installing',
  /// Instance is not installed
  NotInstalled = 'not_installed',
}

export enum ModLoader {
  Vanilla = 'vanilla',
  Forge = 'forge',
  Fabric = 'fabric',
  Quilt = 'quilt',
  NeoForge = 'neoforge',
}

export interface InstanceCreateDto {
  name: string;
  gameVersion: string;
  modLoader: ModLoader;
  loaderVersion?: string;
  iconPath?: string;
  skipInstallProfile?: boolean;
}

export interface InstanceLaunchDto {
  instance: Instance;
  envArgs: Array<[string, string]>;
  javaArgs: string[];
  memory: MemorySettings;
  resolution: WindowSize;
  credentials: Credentials;
}

export interface Credentials {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  expires: Date;
  active: boolean;
}
