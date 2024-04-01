import { getTextFromContent } from "./text-from-content";

describe("content から正しくテキストを取得できるか", () => {
  it("h2, p, span", () => {
    const content = `
    <h2>heading</h2>
    <p>1 2 <br /> 3 <span>4 5</span> 6</p>
    <p>7 8 9 <span>10 11</span> 12</p>
    `.trim();
    const expected = "heading  1 2  3 4 5 6  7 8 9 10 11 12";
    expect(getTextFromContent(content)).toBe(expected);
  });
});
