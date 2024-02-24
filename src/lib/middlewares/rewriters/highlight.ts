import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export function highlight(html: string): string {
  const $ = load(html);
  const $preCodeBlocks = $("div :has(pre code)");

  $preCodeBlocks.each((_, preCodeBlock) => {
    const $code = $(preCodeBlock).find("pre code");
    const $container = $code.parent().parent();

    const langName = $code.attr("class")?.split("-").at(-1);
    if (langName == null) return;

    let result;
    if (langName !== "") {
      result = hljs.highlight($code.text(), {
        language: langName,
      });
    } else {
      result = hljs.highlightAuto($code.text());
    }

    const fileName = $container.attr("data-filename");
    const fullLangName = hljs.getLanguage(langName)?.name;

    if (fileName != null && fullLangName != null) {
      $code
        .parent()
        .before(`<div><pre>${fileName}</pre><p>${fullLangName}</p></div>`);
    }

    $code.html(result.value);
    $container.addClass("code-block");
  });

  return $.html();
}
