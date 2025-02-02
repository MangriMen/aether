import type { Component } from 'solid-js';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';

import { CreateInstancePluginsMenu } from '@/features/create-instance-plugins-menu';

// eslint-disable-next-line boundaries/element-types
import { useTranslate } from '@/app/model';

import { CreateCustomInstanceDialogBody } from '../CreateCustomInstanceDialogBody';

import type { CreateInstanceDialogProps } from '.';

enum CreateInstanceDialogTabs {
  Custom = 'custom',
  Import = 'import',
  Plugins = 'plugins',
}

export const CreateInstanceDialog: Component<CreateInstanceDialogProps> = (
  props,
) => {
  const [{ t }] = useTranslate();

  return (
    <Dialog {...props}>
      <DialogContent class='bg-secondary-dark'>
        <DialogHeader>
          <DialogTitle>Create Instance</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={CreateInstanceDialogTabs.Custom}>
          <TabsList class='bg-secondary-dark p-0'>
            <TabsTrigger value={CreateInstanceDialogTabs.Custom}>
              {t('createInstance.custom')}
            </TabsTrigger>
            <TabsTrigger value={CreateInstanceDialogTabs.Plugins}>
              {t('createInstance.plugins')}
            </TabsTrigger>
          </TabsList>
          <Separator class='mb-4 mt-2' />
          <TabsContent value={CreateInstanceDialogTabs.Custom}>
            <CreateCustomInstanceDialogBody onOpenChange={props.onOpenChange} />
          </TabsContent>
          <TabsContent value={CreateInstanceDialogTabs.Plugins}>
            <CreateInstancePluginsMenu onOpenChange={props.onOpenChange} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
