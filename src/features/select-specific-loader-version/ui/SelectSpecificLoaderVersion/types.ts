import type { SelectRootProps } from '@/shared/ui';

import type { LoaderVersion } from '@/entities/minecraft';

export type SelectSpecificLoaderVersionProps<
  Option extends LoaderVersion = LoaderVersion,
> = SelectRootProps<Option, never, 'div'> & {
  multiple?: false;
  errorMessage?: string;
};
