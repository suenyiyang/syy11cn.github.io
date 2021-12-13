console.log(window.markdownit);

const md = window.markdownit({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // language specified
    if (lang && hljs.getLanguage(lang)) {
      try {
        // get styled html
        const lines = hljs.highlight(str, { language: lang }).value.split('\n');
        const preCode = lines
          .map((item, index) => {
            return '<li data-line="' + (index + 1) + '">' + item + '</li>';
          })
          .join('\n');
        let html = '<ol>' + preCode + '</ol>';
        console.log(html);
        // add language name
        if (preCode.length) {
          html += '<b class="name">' + lang + '</b>';
        }
        console.log(md.linkify.match(html));
        // match links
        md.linkify.match(html).forEach((item) => {
          html = html.replace(
            item.url,
            `<a href='${item.url}/'>${item.url}/</a>`
          );
          console.log(html);
        });
        return '<pre><code>' + html + '</code></pre>';
      } catch (__) {
        console.log(__);
      }
    }
  },
});

const main = document.querySelector('.main');

const source = `
\`\`\`javascript
const YiyangSun = {
  introduction: "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
  blog: "https://blog.syy11.cn",
  github: "https://github.com/syy11cn",
  twitter: "https://zhihu.com/people/syy11cn"
};
\`\`\`
`;

const result = md.render(source);
main.innerHTML = result;
