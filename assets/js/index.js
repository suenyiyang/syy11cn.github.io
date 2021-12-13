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
        // add language name
        if (preCode.length) {
          html += '<b class="name">' + lang + '</b>';
        }
        // match links
        md.linkify.match(html).forEach((item) => {
          const url = item.url.replace('&quot;', '');
          html = html.replace(url, `<a href='${url}'>${url}</a>`);
        });
        return '<pre><code>' + html + '</code></pre>';
      } catch (__) {}
    }
  },
});

const result = md.render(source);

const main = document.querySelector('.main');
main.innerHTML = result;
