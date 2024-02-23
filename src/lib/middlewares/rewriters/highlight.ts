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
      result = hljs.highlight(langName, $code.text());
    } else {
      result = hljs.highlightAuto($code.text());
    }

    const fileName = $container.attr("data-filename");
    if (fileName != null) {
      $code
        .parent()
        .before(`<div><pre>${fileName}</pre><p>${langName}</p></div>`);
    } else {
      $code.parent().before(`<div><pre></pre><p>${langName}</p></div>`);
    }

    $code.html(result.value);
    // $code.addClass("hljs");
    $container.addClass("code-block");
  });

  return $.html();
}
