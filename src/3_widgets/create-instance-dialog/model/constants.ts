import type { Option } from '@/shared/model';

import { ModLoader } from '@/entities/minecraft';

export const loaders: Option<ModLoader>[] = [
  { name: 'Vanilla', value: ModLoader.Vanilla },
  { name: 'Forge', value: ModLoader.Forge },
  { name: 'Fabric', value: ModLoader.Fabric },
  { name: 'Quilt', value: ModLoader.Quilt },
  { name: 'NeoForge', value: ModLoader.NeoForge },
];

export const loaderVersionTypes: Option[] = [
  {
    name: 'Stable',
    value: 'stable',
  },
  {
    name: 'Latest',
    value: 'latest',
  },
  {
    name: 'Other',
    value: 'other',
  },
];
