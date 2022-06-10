const fs = require("fs");

const all = JSON.parse(fs.readFileSync("urls.json"))

const repls = [];

for (const url of all) {
  if (/https:\/\/(.*).repl.co/.test(url)) {
    if (/https:\/\/(.*)\.(.*)\.repl\.co/.test(url)) {
      // Double barrel replit link
      const match = url.match(/https:\/\/(.*)\.(.*)\.repl\.co/);

      repls.push({
        user: match[2],
        name: match[1]
      })

      console.log(`${match[2]}/${match[1]}`)
      continue
    }

    const match = url.match(/https:\/\/(.*)\.repl\.co/);
    if (!match) continue;
    repls.push({
        user: match[1],
    })

    console.log(match[1])
  }
}

fs.writeFileSync("repls.json", JSON.stringify(repls))