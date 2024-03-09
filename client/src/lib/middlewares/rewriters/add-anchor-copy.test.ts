import { addAnchorCopy } from "./add-anchor-copy";

describe("アンカーコピー追加", () => {
  it("h2", () => {
    const h2 = `<h2 id="id">h2</h2>`;
    const expected = `<h2 id="id"><a href="#id">#</a>h2</h2>`;

    expect(addAnchorCopy(h2)).contain(expected);
  });

  it("h3", () => {
    const h3 = `<h3 id="id">h3</h3>`;
    const expected = `<h3 id="id"><a href="#id">#</a>h3</h3>`;

    expect(addAnchorCopy(h3)).contain(expected);
  });
});
