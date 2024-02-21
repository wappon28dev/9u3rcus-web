export async function waitMs(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function formatDate(
  date: Date,
  format: "YYYY.MM" | "YYYY.MM.DD"
): string {
  switch (format) {
    case "YYYY.MM":
      return `${date.getFullYear()}.${date.getMonth() + 1}`;
    case "YYYY.MM.DD":
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    default:
      throw new Error("Invalid format");
  }
}
