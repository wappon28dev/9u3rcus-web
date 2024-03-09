import { detectMediaKey } from "./convert2media";

describe("MediaKey の判別", () => {
  it("video", () => {
    const ext = "mp4";
    const expected = "video";

    expect(detectMediaKey(ext)).toBe(expected);
  });

  it("img", () => {
    const ext = "jpg";
    const expected = "img";

    expect(detectMediaKey(ext)).toBe(expected);
  });
});
