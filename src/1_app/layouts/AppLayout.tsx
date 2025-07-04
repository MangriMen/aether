import { ErrorBoundary, type Component, type JSX } from 'solid-js';

import { AppTitleBar } from '@/widgets/app-titlebar';
import { AppErrorBoundary } from './AppErrorBoundary';

export type AppLayoutProps = {
  children?: JSX.Element;
};

export const AppLayout: Component<AppLayoutProps> = (props) => {
  return (
    <>
      <AppTitleBar />
      <div class='mt-[40px] flex size-full flex-col overflow-hidden'>
        <ErrorBoundary
          fallback={(_, reset) => <AppErrorBoundary reset={reset} />}
        >
          {props.children}
        </ErrorBoundary>
      </div>
    </>
  );
};
