import { css } from "panda/css";
import { HStack, VStack, styled as p } from "panda/jsx";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { Icon } from "@iconify/react";
import { formatDate, waitMs, type ArrayElem } from "@/lib/consts";
import { VideoPlayer } from "../VideoPlayer";
import { modifySrc } from "@/lib/services/media";
import type { EndPoints } from "@/lib/types/cms-types";

type WorksList = EndPoints["gets"]["works"];

function Works({
  id,
  title,
  ogpImg,
  releaseDate,
  videoOnHover,
}: ArrayElem<WorksList["contents"]>): ReactElement {
  return (
    <p.a
      key={id}
      bg="9u-gray"
      className={css({
        "& > *": {
          pointerEvents: "none",
          overflow: "hidden",
        },
        "& video": {
          pointerEvents: "auto",
        },
      })}
      href={`/works/${id}?returnToHome`}
      overflow="hidden"
      position="relative"
      w="100%"
    >
      <p.img
        alt={title}
        height={ogpImg.height}
        src={ogpImg.url}
        width={ogpImg.width}
      />
      <p.div
        h="100%"
        left="50%"
        opacity={{
          base: "0",
          _hover: "1",
        }}
        position="absolute"
        style={{
          pointerEvents: videoOnHover != null ? "none" : "auto",
        }}
        top="50%"
        transform="translate(-50%, -50%)"
        transition="opacity 0.3s"
        w="100%"
      >
        <p.div h="100%" overflow="hidden" position="relative">
          {videoOnHover != null && (
            <VideoPlayer
              muted
              playOnHover
              src={modifySrc(videoOnHover)}
              style={{
                minWidth: "100%",
                minHeight: "100%",
              }}
            />
          )}
          <p.div
            bg="9u-red1"
            h="100%"
            left="50%"
            opacity="0.5"
            position="absolute"
            top="50%"
            transform="translate(-50%, -50%)"
            w="100%"
          />
          <p.div
            color="9u-white"
            left="50%"
            position="absolute"
            top="50%"
            transform="translate(-50%, -50%)"
            w="100%"
          >
            <p.p fontSize="xl" fontWeight="bold">
              {title}
            </p.p>
            <p.p>{formatDate(new Date(releaseDate), "YYYY.MM")}</p.p>
          </p.div>
        </p.div>
      </p.div>
    </p.a>
  );
}

export function WorksListOmitted({
  worksList,
  omitRowLength = 2,
}: {
  worksList: WorksList;
  omitRowLength?: number | undefined;
}): ReactElement {
  const [rowLength, setRowLength] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const contents = useMemo(
    () => worksList.contents.slice(0, rowLength * omitRowLength),
    [rowLength],
  );

  const computeRowLength = (): void => {
    void (async () => {
      await waitMs(100);
      if (ref.current == null) throw new Error("ref.current is null");
      const style = getComputedStyle(ref.current);
      const columnCount = style
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
      setRowLength(columnCount);
    })();
  };

  useEffect(() => {
    computeRowLength();
    window.addEventListener("resize", computeRowLength);
    return () => {
      window.removeEventListener("resize", computeRowLength);
    };
  }, []);

  return (
    <VStack gap="10" w="100%">
      <p.div
        ref={ref}
        display="grid"
        gap="10"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        textAlign="center"
        w="100%"
      >
        {contents.map((works, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Works {...works} key={i} />
        ))}
      </p.div>
      <p.a href="/works">
        <HStack fontSize="xl" fontWeight="bold" gap="2">
          View More
          <Icon icon="mdi:arrow-right" />
        </HStack>
      </p.a>
    </VStack>
  );
}
