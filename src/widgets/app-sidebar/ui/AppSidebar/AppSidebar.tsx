import { A } from '@solidjs/router';
import { Component, createSignal, splitProps } from 'solid-js';

import { cn } from '@/shared/lib';
import {
  AddIcon,
  HomeIcon,
  IconButton,
  SettingsIcon,
  Sidebar,
} from '@/shared/ui';

// TODO: make something like react-modal-global
// eslint-disable-next-line boundaries/element-types
import { CreateInstanceDialog } from '@/widgets/create-instance-dialog';

import { AppSidebarProps } from '.';

export const AppSidebar: Component<AppSidebarProps> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  const [isCreateInstanceDialogOpen, setIsCreateInstanceDialogOpen] =
    createSignal(false);

  return (
    <Sidebar class={cn('justify-between', local.class)} {...others}>
      <div class='flex flex-col items-center gap-2'>
        <IconButton as={A} href='/' variant='ghost'>
          <HomeIcon />
        </IconButton>
      </div>
      <div class='flex flex-col items-center gap-2'>
        <IconButton
          variant='success'
          onClick={() => setIsCreateInstanceDialogOpen(true)}
        >
          <AddIcon />
        </IconButton>
        <IconButton as={A} href='/settings' variant='ghost'>
          <SettingsIcon />
        </IconButton>
      </div>

      {/* Dialogs */}
      <CreateInstanceDialog
        open={isCreateInstanceDialogOpen()}
        onOpenChange={setIsCreateInstanceDialogOpen}
      />
    </Sidebar>
  );
};
