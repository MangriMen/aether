import MdiStopIcon from '@iconify/icons-mdi/stop';
import type { PolymorphicProps } from '@kobalte/core';
import type { Component, ValidComponent } from 'solid-js';

import type { IconButtonProps } from '@/shared/ui';
import { CombinedTooltip, IconButton } from '@/shared/ui';

import { useTranslation } from '@/shared/model';

export type InstanceStopButtonProps<T extends ValidComponent = 'button'> =
  PolymorphicProps<T, IconButtonProps<T>>;

export const InstanceStopButton: Component<InstanceStopButtonProps> = (
  props,
) => {
  const [{ t }] = useTranslation();

  return (
    <CombinedTooltip
      label={t('instance.stop')}
      as={IconButton}
      variant='destructive'
      icon={MdiStopIcon}
      {...props}
    />
  );
};
