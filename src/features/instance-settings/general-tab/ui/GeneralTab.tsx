import { throttle } from '@solid-primitives/scheduled';
import { Component, ComponentProps, splitProps } from 'solid-js';

import { cn } from '@/shared/lib';
import { CombinedTextField } from '@/shared/ui';

import {
  editMinecraftInstance,
  Instance,
  InstanceSettingsTabProps,
} from '@/entities/instance';

export type GeneralTabProps = ComponentProps<'div'> & InstanceSettingsTabProps;

const GeneralTab: Component<GeneralTabProps> = (props) => {
  const [local, others] = splitProps(props, ['instance', 'class']);

  const handleChangeNameThrottle = throttle(
    (id: Instance['id'], value: string) => {
      editMinecraftInstance(id, { name: value });
    },
    16,
  );

  const handleChangeName = (value: string) => {
    handleChangeNameThrottle(local.instance.id, value);
  };

  return (
    <div class={cn('flex flex-col', local.class)} {...others}>
      <CombinedTextField
        label='Name'
        defaultValue={local.instance.name}
        onChange={handleChangeName}
      />
    </div>
  );
};

export default GeneralTab;
