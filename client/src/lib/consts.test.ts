import { formatDate } from "./consts";

describe("日付変換", () => {
  const date = new Date("2024-03-09T10:47:08.714Z");

  it("YYYY.MM", () => {
    expect(formatDate(date, "YYYY.MM")).toBe("2024.03");
  });

  it("YYYY.MM.DD", () => {
    expect(formatDate(date, "YYYY.MM.DD")).toBe("2024.03.09");
  });

  it("YYYY-MM-DD HH:mm:ss", () => {
    expect(formatDate(date, "YYYY-MM-DD HH:mm:ss")).toBe("2024-03-09 19:47:08");
  });
});
