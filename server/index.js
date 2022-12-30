const fs = require("fs");
const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server Works !!! At port ${PORT}`);
});

app.get("/youtube/validateURL", async (req, res, next) => {
  try {
    var url = req.query.url;
    if (!ytdl.validateURL(url)) {
      return res.sendStatus(400);
    }
    var info = await ytdl.getInfo(url);

    var formats = info.formats
      .filter(p => (p.mimeType.includes("video") || p.mimeType.includes("audio")))
      .map(f => {
        return {
          code: f.container,
          type: f.hasVideo === true ? "video" : "audio",
          quality: f.qualityLabel,
          size: Math.round((f.hasVideo === true ? f.bitrate / 8 : f.audioBitrate / 8) / 1000, 2)
        }
      }).sort((a, b) => Number(b.size) - Number(a.size))

    res.status(200).json({
      state: 'sucess',
      video: {
        source: 'youtube',
        formats: formats
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/youtube/downloadmp3", async (req, res, next) => {
  try {
    var url = req.query.url;
    if (!ytdl.validateURL(url)) {
      return res.sendStatus(400);
    }
    let title = "audio";

    // await ytdl.getBasicInfo(url, {
    // 	format: 'mp4'
    // }, (err, info) => {
    // 	if (err) throw err;
    // 	title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    // });

    res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);
    ytdl(url, {
      format: "mp3",
      filter: "audioonly",
    }).pipe(res);
  } catch (err) {
    console.error(err);
  }
});

app.get("/youtube/downloadmp4", async (req, res, next) => {
  try {
    let url = req.query.url;
    let qualityLabel = req.query.quality;
    let type = req.query.type

    if (!ytdl.validateURL(url)) {
      return res.sendStatus(400);
    }
    let title = "video";

    // await ytdl.getBasicInfo(url, {
    // 	format: 'mp4'
    // }, (err, info) => {

    // 	title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    // });

    res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);

    await ytdl(
      url,
      { filter: format => format.qualityLabel === qualityLabel && format.container=== type }).pipe(res);
  } catch (err) {
    console.error(err);
  }
});
