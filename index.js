var express = require("express");
var path = require("path");
request = require('request-json');
var app = express();
const instagramPosts = require('instagram-posts');
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() { });

app.use(express.static('public'))

// Dit is de route naar de instagram pagina.
app.get('/', function(req, res) {
  instagramPosts('hvrmns').then(afbeeldingen => {
  console.log(afbeeldingen);
      res.render("index", {
        afbeeldingen: afbeeldingen
      });
  });
});

// Dit is de route naar de view om een individuele post te tonen
// Ik gebruik hiervoor een regular expression. Dit is een superkrachtig mechanisme om tekstpatronen op te sporen
// Jullie hoeven dit niet te gebruiken: je kan rustig met een ID werken zoals vrijdag getoond in de les
// Wil je toch meer weten over regular expressions (een aanrader!)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://www.lynda.com/Regular-Expressions-tutorials/Using-Regular-Expressions/85870-2.html
app.get(/^\/(\d\d\d\d\/\d\d\/\d\d\/.*)$/, function(req, res) {
  var slug = req.params[0];
  var teller = 0;
  var blogpost = "";
  while (teller < postsFile.blogposts.length ) {
    if (postsFile.blogposts[teller].slug === slug) {
      blogpost = postsFile.blogposts[teller];
    }
    teller++;
  }
  if (blogpost !== "") {
    res.render("post", {
      post: blogpost
    });
  } else {
    console.log(slug);
    res.render("404", {});
  }
});
