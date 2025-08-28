import React, { forwardRef, useEffect, useState } from "react";
import { useDebouncedCallback } from "./hooks/useDebouncedCallback";
import {
  Field,
  IconWrap,
  InputEl,
  ResultsText,
  Title,
  Wrapper,
} from "./styles";
import type { SearchInputProps } from "./types";
import { IoSearch } from "react-icons/io5";

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      title,
      value,
      placeholder = "SEARCH A CHARACTER...",
      ariaLabel = "Search",
      disabled,
      size = "lg",
      fullWidth = true,
      icon,
      className,
      onDebouncedChange,
      debounceMs = 600,
      resultsCount = null,
    },
    ref
  ) => {
    const [text, setText] = useState(value);
    useEffect(() => setText(value), [value]);

    const { debounced } = useDebouncedCallback(onDebouncedChange, debounceMs);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setText(next);
      debounced(next);
    };

    return (
      <Wrapper $fullWidth={fullWidth} className={className}>
        {title && <Title>{title}</Title>}
        <Field $size={size} $disabled={!!disabled}>
          <IconWrap>{icon ?? <IoSearch color="black" size={20} />}</IconWrap>
          <InputEl
            ref={ref}
            aria-label={ariaLabel}
            role="searchbox"
            type="search"
            inputMode="search"
            placeholder={placeholder}
            disabled={disabled}
            value={text}
            onChange={handleChange}
          />
        </Field>
        {resultsCount && (
          <ResultsText aria-live="polite">{resultsCount} RESULTS</ResultsText>
        )}
      </Wrapper>
    );
  }
);

SearchInput.displayName = "SearchInput";
