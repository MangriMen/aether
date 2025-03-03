import type { Component, ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';

import type { Instance } from '@/entities/instances';
import { InstanceImage } from '@/entities/instances';

import { InstanceActionButton } from '@/features/instance-action-button';

import InstanceHeaderInfo from './InstanceInfo';
import OpenFolderButton from './OpenFolderButton';
import SettingsButton from './SettingsButton';

export type HeaderProps = ComponentProps<'div'> & {
  instance: Instance;
};

export const Header: Component<HeaderProps> = (props) => {
  const [local, others] = splitProps(props, ['instance', 'class']);

  return (
    <div class='flex gap-3' {...others}>
      <InstanceImage src={local.instance.iconPath} />
      <InstanceHeaderInfo instance={local.instance} />
      <div class='ml-auto flex items-center gap-2'>
        <InstanceActionButton class='w-20 p-2' instance={local.instance} />
        <OpenFolderButton instance={local.instance} />
        <SettingsButton />
      </div>
    </div>
  );
};
