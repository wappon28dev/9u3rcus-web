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

  it("YYYY年M月d日", () => {
    expect(formatDate(date, "YYYY年M月d日")).toBe("2024年3月9日");
  });
});
