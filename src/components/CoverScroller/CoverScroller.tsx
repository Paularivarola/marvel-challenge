import { useEffect, useMemo, useRef, useState } from "react";
import {
  CoverImage,
  CoverWrapper,
  Item,
  ItemButton,
  ItemLink,
  ItemSubtitle,
  ItemTitle,
  ProgressBar,
  ProgressTrack,
  ScrollerList,
  ScrollerWrapper,
  Section,
  SectionTitle,
} from "./styles";
import type { CoverScrollerProps } from "./types";

const CoverScroller = ({
  title,
  items,
  className,
  onItemClick,
  ariaLabel = "media scroller",
}: CoverScrollerProps) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? el.scrollLeft / max : 1;
    setProgress(pct);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const progressStyle = useMemo(
    () => ({ transform: `scaleX(${progress})` }),
    [progress]
  );

  return (
    <Section className={className}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <ScrollerWrapper>
        <ScrollerList ref={trackRef} role="list" aria-label={ariaLabel}>
          {items.map((it) => {
            const content = (
              <>
                <CoverWrapper>
                  <CoverImage
                    src={it.image.super_url}
                    alt={it.name}
                    loading="lazy"
                  />
                </CoverWrapper>
                <ItemTitle>{it.name}</ItemTitle>
                {it.volume.name && (
                  <ItemSubtitle>{it.volume.name}</ItemSubtitle>
                )}
              </>
            );
            return (
              <Item key={it.id}>
                {it.site_detail_url ? (
                  <ItemLink
                    target="_blank"
                    href={it.site_detail_url}
                    aria-label={it.site_detail_url}
                  >
                    {content}
                  </ItemLink>
                ) : (
                  <ItemButton
                    type="button"
                    onClick={() => onItemClick?.(it.id)}
                    aria-label={it.name}
                  >
                    {content}
                  </ItemButton>
                )}
              </Item>
            );
          })}
        </ScrollerList>
        <ProgressTrack aria-hidden="true">
          <ProgressBar style={progressStyle} />
        </ProgressTrack>
      </ScrollerWrapper>
    </Section>
  );
};

export default CoverScroller;
