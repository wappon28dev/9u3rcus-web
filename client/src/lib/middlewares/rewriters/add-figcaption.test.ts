import { addFigcaption } from "./add-figcaption";

describe("figcaption 追加", () => {
  it("alt を figcaption へ変換", () => {
    const html = `
      <figure><img src="image.jpg" alt="Image alt text"></figure>
      `.trim();
    const expectedHtml = `
      <figure><img src="image.jpg" alt="Image alt text"><figcaption>Image alt text</figcaption></figure>
      `.trim();

    expect(addFigcaption(html)).contain(expectedHtml);
  });
});
