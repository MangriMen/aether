import type { Component } from 'solid-js';
import { splitProps, createMemo, Show } from 'solid-js';

import type { IconButtonProps } from '@/shared/ui';

import type { Instance } from '@/entities/instances';
import {
  InstanceInstallStage,
  InstancePlayButton,
  InstanceStopButton,
  useInstanceActions,
  useRunningInstancesContext,
} from '@/entities/instances';

export type InstanceActionButtonProps = IconButtonProps & {
  instance: Instance;
};

const InstanceActionButton: Component<InstanceActionButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['instance']);

  const [context, { get }] = useRunningInstancesContext();
  const runningInstance = createMemo(() => get(context, local.instance.id));

  const { launchInstance, stopInstance } = useInstanceActions();

  const isInstanceInstalled = createMemo(
    () => local.instance.installStage === InstanceInstallStage.Installed,
  );

  const isInstanceInstalling = createMemo(
    () => local.instance.installStage === InstanceInstallStage.Installing,
  );

  const isPlayButtonLoading = createMemo(
    () => isInstanceInstalling() || runningInstance()?.isLoading,
  );

  const isPlayButton = createMemo(() => !runningInstance()?.isRunning);

  const isPlayButtonDisabled = createMemo(
    () =>
      !isInstanceInstalled() ||
      runningInstance()?.isRunning ||
      runningInstance()?.isLoading,
  );

  const handleLaunch = () => launchInstance(local.instance);
  const handleStop = () => stopInstance(local.instance);

  return (
    <Show
      when={isPlayButton()}
      fallback={<InstanceStopButton onClick={handleStop} {...others} />}
    >
      <InstancePlayButton
        loading={isPlayButtonLoading()}
        disabled={isPlayButtonDisabled()}
        onClick={handleLaunch}
        {...others}
      />
    </Show>
  );
};

export default InstanceActionButton;
