import { createAsync } from '@solidjs/router';
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  Match,
  Show,
  splitProps,
  Switch,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import { cn } from '@/shared/lib';
import { Option } from '@/shared/model';
import {
  Button,
  DialogFooter,
  Field,
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from '@/shared/ui';

import {
  createMinecraftInstance,
  getMinecraftVersionManifest,
  InstanceCreateDto,
  ModLoader,
} from '@/entities/minecraft';

import { SelectGameVersion } from '@/features/select-game-version';
import { SelectLoaderChips } from '@/features/select-loader-chips';
import { SelectLoaderTypeChips } from '@/features/select-loader-version';
import { SelectSpecificLoaderVersion } from '@/features/select-specific-loader-version';

import {
  CreateCustomInstanceFormProps,
  CreateCustomInstanceDialogBodyProps,
} from '.';

const loaders = [
  { name: 'Vanilla', value: 'vanilla' },
  { name: 'Forge', value: 'forge' },
  { name: 'Fabric', value: 'fabric' },
  { name: 'Quilt', value: 'quilt' },
];

const loaderVersionTypes: Option[] = [
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

export const CreateCustomInstanceDialogBody: Component<
  CreateCustomInstanceDialogBodyProps
> = (props) => {
  const version_manifest = createAsync(() => getMinecraftVersionManifest());

  const version_list = createMemo(() => version_manifest()?.versions ?? []);

  const [isAdvanced, setIsAdvanced] = createSignal(false);

  const [local, others] = splitProps(props, ['class', 'onOpenChange']);

  const [fields, setFields] = createStore<CreateCustomInstanceFormProps>({
    gameVersion: undefined,
    loader: 'vanilla',
    loaderType: 'stable',
    loaderVersion: undefined,
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const dataObject = { ...fields, ...Object.fromEntries(data.entries()) };

    if (dataObject.gameVersion === undefined) {
      return;
    }

    const dto: InstanceCreateDto = {
      name: dataObject.name,
      game_version: dataObject.gameVersion.id,
      mod_loader: 'vanilla',
    };

    console.log(dto);

    try {
      await createMinecraftInstance(dto);
      props.onOpenChange?.(false);
    } catch (e) {
      console.error(e);
    }
  };

  createEffect(() => {
    if (!isAdvanced()) {
      setFields('loaderType', 'stable');
    }
  });

  return (
    <form
      class={cn('flex flex-col gap-4', local.class)}
      onSubmit={handleSubmit}
      {...others}
    >
      <TextField class='flex flex-col gap-2'>
        <TextFieldLabel for='name'>Name</TextFieldLabel>
        <TextFieldInput
          type='text'
          id='name'
          name='name'
          class='max-w-[36ch]'
          maxLength={32}
          required
        />
      </TextField>

      <Field label='Game Version'>
        <SelectGameVersion
          class='max-w-[31.5ch]'
          placeholder='Select game version'
          advanced={isAdvanced()}
          value={fields.gameVersion}
          options={version_list()}
          onChange={(value) => setFields('gameVersion', value ?? undefined)}
        />
      </Field>

      <Field label='Loader'>
        <SelectLoaderChips
          loaders={loaders}
          defaultValue={loaders[0].value}
          value={fields.loader}
          onChange={(value) => {
            if (value) {
              setFields('loader', value);
            }
          }}
        />
      </Field>

      <Show when={isAdvanced()}>
        <Field label='Loader Version'>
          <SelectLoaderTypeChips
            loaderTypes={loaderVersionTypes}
            value={fields.loaderType}
            onChange={(value) => {
              setFields('loaderType', value);
            }}
          />
        </Field>

        <Show when={fields.loaderType === 'other'}>
          <Show
            when={fields.gameVersion !== undefined}
            fallback={
              <span class='italic'>
                Select a game version before you select a loader version
              </span>
            }
          >
            <Field label='Select version'>
              <SelectSpecificLoaderVersion
                placeholder='Select loader version'
                // TODO
                options={[]}
                //@ts-expect-error TODO: fix
                onChange={(value) => setFields('loaderVersion', value?.id)}
              />
            </Field>
          </Show>
        </Show>
      </Show>

      <DialogFooter>
        <Button size='sm' onClick={() => setIsAdvanced(!isAdvanced())}>
          <Switch>
            <Match when={isAdvanced()}>Hide advanced</Match>
            <Match when={!isAdvanced()}>Show advanced</Match>
          </Switch>
        </Button>

        <Button size='sm' variant='success' type='submit'>
          Create
        </Button>

        <Button size='sm' onClick={() => props.onOpenChange?.(false)}>
          Cancel
        </Button>
      </DialogFooter>
    </form>
  );
};