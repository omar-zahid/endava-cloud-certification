import type { CSSProperties } from "react";

type CarouselLink =
  | {
      kind: "external";
      href: string;
      openInNewTab?: boolean;
    }
  | {
      kind: "internal";
      to: string;
    };

type CarouselSlide = {
  id: string;
  imageSrc: string;
  imageAlt?: string;
  content?: {
    hidden?: boolean;
    title?: string;
    body?: string;
    wrapperStyle?: CSSProperties;
    button?: {
      text?: string;
      link?: CarouselLink;
      hidden?: boolean;
    };
  };
};

type CarouselProps = {
  slides?: CarouselSlide[];
  title?: string;
  subtitle?: string;
  circular?: boolean;
  autoplayInterval?: number;
};

export type { CarouselLink, CarouselProps, CarouselSlide };
