type Size = "sm" | "md" | "lg";

export interface SearchInputProps {
  title?: string;
  value: string;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  size?: Size;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onDebouncedChange: (value: string) => void;
  debounceMs?: number;
  resultsCount?: number;
}
