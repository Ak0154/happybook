import { useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import {
  Checkbox,
  type CheckboxProps,
} from '@/components/animate-ui/components/radix/checkbox';

interface RadixCheckboxDemoProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  variant?: CheckboxProps['variant'];
  size?: CheckboxProps['size'];
}

export const RadixCheckboxDemo = ({
  checked = false,
  onCheckedChange,
  variant,
  size,
}: RadixCheckboxDemoProps) => {
  return (
    <Label className="flex items-center gap-x-3 text-white">
      <Checkbox
        checked={checked}
        onCheckedChange={(c) => onCheckedChange?.(c as boolean)}
        variant={variant}
        size={size}
      />
      Accept terms and conditions
    </Label>
  );
};
