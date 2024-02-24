import type { ReactElement, VideoHTMLAttributes } from "react";
import { waitMs } from "@/lib/constants";

export function VideoPlayer({
  playOnHover = true,
  ...props
}: {
  playOnHover?: boolean;
} & VideoHTMLAttributes<HTMLVideoElement>): ReactElement {
  return (
    <video
      {...props}
      onPointerEnter={(e) => {
        const video = e.currentTarget;
        if (playOnHover) {
          void video.play();
        }
      }}
      onPointerLeave={(e) => {
        const video = e.currentTarget;
        if (playOnHover) {
          video.pause();
          void waitMs(100).then(() => {
            video.currentTime = 0;
          });
        }
      }}
    >
      <track kind="captions" />
    </video>
  );
}
