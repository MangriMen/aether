import { Show } from 'solid-js';
import { useImportConfigs } from '@/entities/instances';
import type { DialogRootProps } from '@kobalte/core/dialog';
import type { Component, ComponentProps } from 'solid-js';
import { ImportInstanceForm } from './ImportInstanceForm';
import { useTranslation } from '@/shared/model';

export type ImportInstanceProps = Omit<ComponentProps<'form'>, 'onSubmit'> &
  Pick<DialogRootProps, 'onOpenChange'>;

export const ImportInstance: Component<ImportInstanceProps> = (props) => {
  const importHandlers = useImportConfigs();

  const [{ t }] = useTranslation();

  return (
    <Show
      when={importHandlers.data?.length}
      fallback={
        <div class='flex h-full items-center justify-center'>
          <span class='whitespace-pre-line text-center text-lg text-muted-foreground'>
            {t('createInstance.noImportConfigs')}
          </span>
        </div>
      }
    >
      <ImportInstanceForm
        importHandlers={() => importHandlers.data!}
        {...props}
      />
    </Show>
  );
};
