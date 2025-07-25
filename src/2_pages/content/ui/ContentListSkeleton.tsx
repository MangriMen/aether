import { cn } from '@/shared/lib';
import { Skeleton } from '@/shared/ui';
import { createMemo, For, splitProps } from 'solid-js';
import type { Component, ComponentProps } from 'solid-js';

export type ContentListSkeletonProps = ComponentProps<'div'>;

const ContentListItemSkeleton: Component<ComponentProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return (
    <div
      class={cn(
        'flex gap-2 border border-secondary rounded-lg p-3',
        local.class,
      )}
      {...others}
    >
      <Skeleton radius={8} width={96} height={96} class='bg-secondary' />
      <div class='flex flex-col gap-2 text-muted-foreground'>
        <span class='inline-flex gap-2 text-lg font-bold text-foreground'>
          <Skeleton class='bg-secondary' radius={4} height={24} width={240} />
        </span>
        <Skeleton class='bg-secondary' radius={4} height={24} width={400} />
      </div>
    </div>
  );
};

export const ContentListSkeleton: Component<ContentListSkeletonProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ['class']);

  const items = createMemo(() => {
    return new Array(3).fill(0);
  });

  return (
    <div
      class={cn('flex flex-col gap-2 overflow-y-auto', local.class)}
      {...others}
    >
      <For each={items()}>{(_) => <ContentListItemSkeleton />}</For>
    </div>
  );
};
