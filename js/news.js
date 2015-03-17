define('news', ['jquery'], function($) {
  var News         = {};
  var NewsPrivate  = {};
  var count_news   = 0;
  var news_checked = 0;
  var key          = 'whatsNew____';

  News.setId = function(id) {
    key = id;
  }

  News.boot = function(userOptions) {
    var options = {
      selector: "#dropdown-news",
      limit: false,
      badgeSelector: false
    }
    $.extend(options, userOptions);

    if (options.badgeSelector) {
      NewsPrivate.putInCounter(options.badgeSelector, count_news);
    }

    $.getJSON(require.toUrl("../../news.json"), {}).done(function(data) {
      var news_checked = NewsPrivate.loadItems();
      var items = data.news.item.reverse();

      if (options.limit) {
        items = items.slice(0, options.limit);
      }
      $.each(items, function(key, val) {
        var li = $("<li></li>" ).attr('data-id', val.id).html(val.text).append($('<time></time>').html(val.date));
        if ($.inArray(parseInt(val.id), news_checked) != -1) {
          li.addClass('read');
        } else {
          count_news++;
        }

        $('ul.list', options.selector).append(li);
      });

      if (options.badgeSelector) {
        NewsPrivate.putInCounter(options.badgeSelector, count_news);
      }

      $('ul.list li', options.selector).on('mouseleave', function() {
        if (!$(this).hasClass('read')) {
          count_news--;
          if (options.badgeSelector) {
            NewsPrivate.putInCounter(options.badgeSelector, count_news);
          }
          $(this).addClass("read");
          NewsPrivate.addItem($(this).attr('data-id'));
        }
      });
    });
  };

  NewsPrivate.storage = function() {
    console.log(key)
    if (NewsPrivate.getCookie(key)) {
      result = JSON.parse("[" + NewsPrivate.getCookie(key) + "]");
    } else {
      result = [];
    }
    return result;
  },

  NewsPrivate.putInCounter = function(selector, num) {
    if (parseInt(num) <= 0) {
      $(selector).hide();
    } else {
      $(selector).html(num).show(100);
    }
  };

  NewsPrivate.loadItems = function() {
    return NewsPrivate.storage();
  };

  NewsPrivate.addItem = function(item) {
    var i = NewsPrivate.storage();
    i.push(parseInt(item));
    NewsPrivate.setCookie(key, i);
  };

  NewsPrivate.setCookie = function(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (3600 * 1000 * 24 * 365));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';domain=.abril.com.br';
  };

  NewsPrivate.getCookie = function(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  };

  return News;
});
