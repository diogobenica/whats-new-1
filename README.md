whats-new
---------
What's new list from JSON

# How to use
```
News.boot();
```

# Options
```
News.boot({
  selector: "#dropdown-news", // container selector
  limit: 10, // max items to show
  badgeSelector: "#dropdown-news-button .badge", // bagde counter selector
  file: "../news.json" // news json filepath
});
```

# Multiple instances (even across sites)
```
News.setId('myOtherApp_'); // sets cookie name with another prefix (for read news)
News.boot();
```
