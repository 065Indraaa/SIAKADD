import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export interface LookupItem {
  value: string;
  label: string;
  hint?: string;
}

interface LookupSelectProps {
  value: string;
  onChange: (value: string) => void;
  items: LookupItem[];
  placeholder?: string;
  allowEmpty?: boolean;
  emptyLabel?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Reusable Select that properly displays the item LABEL (not UUID) in the trigger.
 * Works around @base-ui/react/select behavior of showing raw values.
 */
export function LookupSelect({
  value,
  onChange,
  items,
  placeholder = 'Pilih...',
  allowEmpty = false,
  emptyLabel = '— Kosongkan —',
  className,
  disabled = false,
}: LookupSelectProps) {
  const resolveLabel = (v: any): string => {
    if (!v || v === 'none') return allowEmpty ? emptyLabel : placeholder;
    const match = items.find(i => i.value === v);
    return match ? match.label : placeholder;
  };

  return (
    <Select
      value={value || (allowEmpty ? 'none' : '')}
      onValueChange={(v) => onChange(v === 'none' ? '' : (v || ''))}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {(v: any) => resolveLabel(v)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-slate-900 border-white/10 max-h-64">
        {allowEmpty && (
          <SelectItem value="none" className="text-slate-300 italic">
            {emptyLabel}
          </SelectItem>
        )}
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-white">
            <div className="flex flex-col">
              <span className="font-medium">{item.label}</span>
              {item.hint && <span className="text-[10px] text-slate-400">{item.hint}</span>}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
