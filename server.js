const express = require("express");
const nunjucks = require("nunjucks");
const videos = require("./data");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  const about = {
    avatar_url:
      "https://avatars.githubusercontent.com/u/59282828?s=400&u=a63db987145fe0c3d07dbcfd3ae39636e8e9c910&v=4",
    name: "Gabriel Cursi",
    role: "Instrutor - Rocketseat",
    description:
      'Dsenvolvedor front-end, focado em trazer o melhor insino para iniciantes em programação. Colaborador da  <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
    links: [
      {
        name: "Github",
        url: "https://github.com/gabrielcursi",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/GabrielCursi",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/gabrielbertaglia/",
      },
    ],
  };
  return res.render("about", { about });
});

server.get("/portifolio", function (req, res) {
  return res.render("portifolio", { items: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id;

  const video = videos.find(function (video) {
    return video.id === id
  });

  if (!video) {
    return res.send("Video not found");
  }

  return res.render("video", { item: video });

});

server.listen(5000, function () {
  console.log("Server is running");
});
