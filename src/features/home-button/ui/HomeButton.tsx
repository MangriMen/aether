import MdiHomeVariantIcon from '@iconify/icons-mdi/home-variant';
import { useNavigate } from '@solidjs/router';
import type { Component } from 'solid-js';

import type { IconButtonProps } from '@/shared/ui';
import { CombinedTooltip, IconButton } from '@/shared/ui';

// eslint-disable-next-line boundaries/element-types
import { useTranslate } from '@/app/model';

export type HomeButtonProps = IconButtonProps;

const HomeButton: Component<HomeButtonProps> = (props) => {
  const navigate = useNavigate();
  const [{ t }] = useTranslate();

  const handleClick = () => navigate('/');

  return (
    <CombinedTooltip
      label={t('home.title')}
      placement='right'
      as={IconButton}
      variant='ghost'
      icon={MdiHomeVariantIcon}
      onClick={handleClick}
      {...props}
    />
  );
};

export default HomeButton;
