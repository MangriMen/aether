import MdiPlayIcon from '@iconify/icons-mdi/play';
import type { PolymorphicProps } from '@kobalte/core';
import type { Component, ValidComponent } from 'solid-js';

import type { IconButtonProps } from '@/shared/ui';
import { CombinedTooltip, IconButton } from '@/shared/ui';

// eslint-disable-next-line boundaries/element-types
import { useTranslate } from '@/app/model';

export type InstancePlayButtonProps<T extends ValidComponent = 'button'> =
  PolymorphicProps<T, IconButtonProps<T>>;

const InstancePlayButton: Component<InstancePlayButtonProps> = (props) => {
  const [{ t }] = useTranslate();

  return (
    <CombinedTooltip
      label={t('instance.launch')}
      as={IconButton}
      variant='success'
      icon={MdiPlayIcon}
      {...props}
    />
  );
};

export default InstancePlayButton;
