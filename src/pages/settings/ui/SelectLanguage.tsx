import { splitProps } from 'solid-js';

import { cn } from '@/shared/lib';
import type { Locale, Option } from '@/shared/model';
import type { SelectRootProps } from '@/shared/ui';
import {
  Select,
  SelectContent,
  SelectErrorMessage,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

export type SelectLanguageProps<Opt extends Option<Locale> = Option<Locale>> =
  SelectRootProps<Opt, never, 'div'> & {
    multiple?: false;
    errorMessage?: string;
  };

const SelectLanguage = <T extends Option<Locale> = Option<Locale>>(
  props: SelectLanguageProps<T>,
) => {
  const [local, others] = splitProps(props, ['errorMessage', 'class']);

  return (
    <Select
      class={cn('flex flex-col gap-2', local.class)}
      validationState={local.errorMessage ? 'invalid' : 'valid'}
      optionTextValue={'name'}
      optionValue={'value'}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.textValue}</SelectItem>
      )}
      {...others}
    >
      <SelectTrigger>
        <SelectValue<T>>{(state) => state.selectedOption()?.name}</SelectValue>
      </SelectTrigger>
      <SelectContent />
      <SelectErrorMessage>{local.errorMessage}</SelectErrorMessage>
    </Select>
  );
};

export default SelectLanguage;
