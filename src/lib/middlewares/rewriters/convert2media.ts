import { load } from "cheerio";
import { getConfiguredImageService, imageConfig } from "astro:assets";
import { isLocalService } from "astro/assets";
import { INFO } from "@/lib/config";
import { getKeys } from "@/lib/constants";

export function replaceAssetsDomain(src: string): string {
  return src.replace(INFO.site.assets, "");
}

const media2tag = {
  video: {
    ext: ["mp4"],
    elem: "<video>",
  },
  img: {
    ext: ["jpg", "jpeg", "png"],
    elem: "<img>",
  },
} as const satisfies Record<string, { ext: string[]; elem: string }>;

async function inferImageSize(
  src: string
): Promise<{ width: number; height: number }> {
  const imageService = await getConfiguredImageService();
  if (!isLocalService(imageService))
    throw new Error("imageService is not local");

  const url = `http://localhost:4321${src}`;
  const response = await fetch(url);
  const blob = await response.blob();
  const fileReader = new FileReader();

  return await new Promise((resolve) => {
    fileReader.onload = () => {
      const image = new Image();
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
      };
      image.src = fileReader.result;
    };
    fileReader.readAsDataURL(blob);
  });
}

export function convertMedia(html: string): string {
  const $ = load(html);
  const $media = $(".media");

  $media.each(async (_, elem) => {
    const $elem = $(elem);
    let src = $elem.text();

    if (src == null) throw new Error("src is null");

    if (src.startsWith(INFO.site.assets)) {
      src = replaceAssetsDomain(src);
    }

    const ext = src.split(".").at(-1);
    if (ext == null) throw new Error(`_ext is null: ${src}`);

    const key = getKeys(media2tag).find((k) =>
      media2tag[k].ext.includes(ext as never)
    );
    if (key == null) throw new Error(`key is null: ${src}`);

    const { elem: _elem } = media2tag[key];
    const newElem = $(_elem);
    newElem.attr("src", src);

    if (key === "img") {
      const { height, width } = await inferImageSize(src);
      newElem.attr("height", height.toString());
      newElem.attr("width", width.toString());
    }

    $elem.replaceWith(newElem);
  });

  return $.html();
}
