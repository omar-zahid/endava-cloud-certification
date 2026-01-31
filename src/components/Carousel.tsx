import {
  Button,
  Image,
  makeStyles,
  Text,
  tokens,
} from "@fluentui/react-components";
import {
  Carousel as FluentCarousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
  CarouselViewport,
  type CarouselAnnouncerFunction,
} from "@fluentui/react-components";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import carouselImg1 from "../assets/carousel_img_1.svg";
import type { CarouselLink, CarouselProps, CarouselSlide } from "../types/Carousel.types";

const useStyles = makeStyles({
  root: {
    width: "50%",
    alignSelf: "start",
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalL,
    "@media (max-width: 1500px)": {
      width: "70%",
    },
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
  carouselTitle: {
    marginBottom: tokens.spacingVerticalXS,
  },
  carouselSubtitle: {
    marginBottom: tokens.spacingVerticalL,
  },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  bannerCard: {
    height: "300px",
    textAlign: "left",
    position: "relative",
    padding: 0,
    borderRadius: tokens.borderRadiusLarge,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    position: "absolute",
    right: "10%",
    top: "50%",
    transform: "translateY(-50%)",
    background: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalL,
    maxWidth: "340px",
    width: "44%",
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
  },
  contentTitle: {
    margin: 0,
  },
});

type SlideCardProps = {
  slide: CarouselSlide;
  index: number;
  totalSlides: number;
  onLinkClick: (link: CarouselLink) => void;
};

function SlideCard({ slide, index, totalSlides, onLinkClick }: SlideCardProps) {
  const styles = useStyles();

  const content = slide.content;
  const button = content?.button;
  const showContentWrapper = Boolean(
    content &&
      !content.hidden &&
      (content.title || content.body || (button?.text && button.link && !button.hidden)),
  );

  return (
    <CarouselCard
      className={styles.bannerCard}
      aria-label={`${index + 1} of ${totalSlides}`}
      id={`carousel-slide-${slide.id}`}
    >
      <Image
        className={styles.image}
        fit="cover"
        src={slide.imageSrc}
        alt={slide.imageAlt ?? "Carousel slide"}
        loading="lazy"
      />

      {showContentWrapper ? (
        <div className={styles.contentWrapper} style={content?.wrapperStyle}>
          {content?.title ? (
            <Text as="h3" size={400} weight="semibold" className={styles.contentTitle}>
              {content.title}
            </Text>
          ) : null}

          {content?.body ? <Text size={300}>{content.body}</Text> : null}

          {button?.text && button.link && !button.hidden ? (
            <div>
              <Button appearance="primary" onClick={() => onLinkClick(button.link!)}>
                {button.text}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </CarouselCard>
  );
}

const getAnnouncement: CarouselAnnouncerFunction = (
  index: number,
  totalSlides: number,
  _slideGroupList: number[][],
) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export function Carousel({
  slides,
  title = "Certification preparation and resources",
  subtitle = "Following resources are available to get you prepared for certifications.",
  circular = true,
  autoplayInterval = 5000,
}: CarouselProps) {
  const styles = useStyles();
  const navigate = useNavigate();

  const defaultSlides = useMemo<CarouselSlide[]>(
    () => [
      {
        id: "slide-1",
        imageSrc: carouselImg1,
        imageAlt: "Certification preparation resources",
        content: {
          title: "Exam readiness guides",
          body: "Use the official skills outlines and readiness checklists to structure your study plan.",
          button: {
            text: "View resources",
            link: {
              kind: "external",
              href: "https://learn.microsoft.com/",
              openInNewTab: true,
            },
          },
        },
      },
      {
        id: "slide-2",
        imageSrc: carouselImg1,
        imageAlt: "Hands-on labs",
        content: {
          title: "Hands-on labs",
          body: "Practice with guided labs and sandboxes to build confidence before booking the exam.",
        },
      },
      {
        id: "slide-3",
        imageSrc: carouselImg1,
        imageAlt: "Learning paths",
        content: {
          title: "Learning paths",
          body: "Follow curated learning paths aligned with the certification objectives.",
          button: {
            text: "Explore",
            link: { kind: "internal", to: "/" },
          },
        },
      },
      {
        id: "slide-4",
        imageSrc: carouselImg1,
        imageAlt: "Community support",
        content: {
          title: "Community support",
          body: "Join study groups, office hours, and Q&A sessions to unblock faster.",
        },
      },
      {
        id: "slide-5",
        imageSrc: carouselImg1,
        imageAlt: "Announcement",
        content: {
          hidden: true,
        },
      },
    ],
    [],
  );

  const effectiveSlides = slides?.length ? slides : defaultSlides;

  const onLinkClick = useCallback(
    (link: CarouselLink) => {
      if (link.kind === "internal") {
        void navigate({ to: link.to });
        return;
      }

      if (link.openInNewTab) {
        window.open(link.href, "_blank", "noopener,noreferrer");
        return;
      }

      window.location.assign(link.href);
    },
    [navigate],
  );

  return (
    <section className={styles.root} aria-label={title}>
      <div className={styles.header}>
        <Text as="h2" size={500} weight="semibold" className={styles.carouselTitle}>
          {title}
        </Text>
        {subtitle ? <Text size={300} className={styles.carouselSubtitle}>{subtitle}</Text> : null}
      </div>

      <FluentCarousel
        groupSize={1}
        circular={circular}
        announcement={getAnnouncement}
        motion={"fade"}
        autoplayInterval={autoplayInterval}
      >
        <CarouselViewport>
          <CarouselSlider>
            {effectiveSlides.map((slide, index) => (
              <SlideCard
                key={slide.id}
                slide={slide}
                index={index}
                totalSlides={effectiveSlides.length}
                onLinkClick={onLinkClick}
              />
            ))}
          </CarouselSlider>
        </CarouselViewport>

        <CarouselNavContainer
          layout="inline"
          autoplay={{
            defaultChecked: true,
            style: { display: "none" },
          }}
          nextTooltip={{ content: "Go to next", relationship: "label" }}
          prevTooltip={{ content: "Go to prev", relationship: "label" }}
        >
          <CarouselNav>
            {(index) => <CarouselNavButton aria-label={`Carousel slide ${index + 1}`} />}
          </CarouselNav>
        </CarouselNavContainer>
      </FluentCarousel>
    </section>
  );
}
