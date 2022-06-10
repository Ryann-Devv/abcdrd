const express = require("express")
const Database = require("@replit/database")
const fetch = require("node-fetch")
const fs = require("fs")

const app = express()
const db = new Database()
const sleep = ms => new Promise(r =>  setTimeout(r, ms))

app.get('/', (req, res) => res.redirect("https://pinger.weredime.repl.co/"))

/* app.put('/add', express.json(), async (req, res) => {
  let url = req.body.url;
  if (!url || !url.includes("repl.co")) return res.json({ error: "invalid url" })

  if (url.substring(0, 5) !== 'https') {
		if (url.substring(0, 4) !== 'http') {
			url = 'https://' + url;
		}
	}

  var oldUrls = await db.get(`urls`) || []
  fs.writeFileSync("urls.json", JSON.stringify(oldUrls))
  if (oldUrls.includes(url)) return res.json({ error: "this url is already added!" })

  oldUrls.push(url)

  await db.set(`urls`, oldUrls)

  res.header("Access-Control-Allow-Origin", "https://weredime.github.io")

  res.json({ ok: "added" })
}) */

app.listen(3000)

async function main() {
  while (1) {
    
    const urls = require("./repls.json")

    for (let url of urls) {
      (async () => {
        const date = Date.now()
        try {
          await fetch(url)
        } catch(ex) {
          
        }

        console.log(url, " ~ ", Date.now() - date)
      })()
    }
    await sleep(10000)
  }
}

main()

/*
db.get("urls").then(data => {
  fs.writeFileSync("urls.json", JSON.stringify(data))
  db.set("urls", data.map(e => (e.replace(/(.*):\/\/(.*).repl.co\/(?:\/|\/\/)/, "https://$2.repl.co/"))))
}) 
*/