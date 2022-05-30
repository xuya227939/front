const express = require("express");
const ffmpeg = require("./ffmpeg");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const ProgressBar = require("./process");
const { getFile } = require('./download')
const app = express();
const port = 3000;

// const pb = new ProgressBar("下载进度", 50);

// let num = 0,
//   total = 200;
// function downloading() {
//   if (num <= total) {
//     pb.render({ completed: num, total: total });

//     num++;
//     setTimeout(function () {
//       downloading();
//     }, 500);
//   }
// }
// downloading();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// ffmpeg()
//   .input('ohhhhh.mp4')
//   .save('ohhhhh.wav');

// demo: png
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://corki-ui.com');
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// })();

// demo: pdf
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://corki-ui.com', {
//     waitUntil: 'networkidle2',
//   });
//   await page.pdf({ path: 'hn.pdf', format: 'a4' });

//   await browser.close();
// })();

(async () => {
  // const browser = await puppeteer.launch({
  //   args: ['--no-sandbox']
  // });
  // const url = 'https://www.youtube.com/channel/UCI7ktPB6toqucpkkCiolwLg/videos';
  // const page = await browser.newPage();
  // await page.goto(url);
  // const html = await page.content();
  // const results = parse(html);
  const results = ['https://www.youtube.com/watch?v=by9MfjQXwfM'];
  // await browser.close();

  for(let url of results) {
    await getFile(url)
  }

  function parse(html) {
    const $ = cheerio.load(html);
    let results = [];
    $('#contents ytd-grid-video-renderer').each((i, link) => {
      results.push('https://www.youtube.com' + $(link).find('#thumbnail').attr('href'));
    })
    return results;
  }

})();
