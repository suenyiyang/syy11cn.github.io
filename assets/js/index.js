const md = window.markdownit({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // language specified
    if (lang && hljs.getLanguage(lang)) {
      try {
        // get styled html
        const preCode = hljs.highlight(str, { language: lang }).value;
        console.log(preCode);
        // lines
        //   .map((item, index) => {
        //     return (
        //       '<li><span class="line-num" data-line="' +
        //       (index + 1) +
        //       '"></span>' +
        //       item +
        //       '</li>'
        //     );
        //   })
        //   .join('');
        let html = '<ol>' + html + '</ol>';
        // add language name
        if (lines.length) {
          html += '<b class="name">' + lang + '</b>';
        }
        return '<pre class="hljs"><code>' + html + '</code></pre>';
      } catch (__) {}
    }
  },
});
const container = document.querySelector('.container');

const source = `
\`\`\`javascript
  const YiyangSun = {
    introduction: ""
  };
\`\`\`
`;

const result = md.render(source);
container.innerHTML = result;
