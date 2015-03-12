define('news', ['jquery'], function($) {
  var News         = {};
  var NewsPrivate  = {};
  var count_news   = 0;
  var news_checked = 0;
  var key          = 'ubberListNews____';

  News.boot = function(e) {

    NewsPrivate.putInCounter(count_news);

    $.getJSON(require.toUrl("../../news.json"), {}).done(function(data) {
      var news_checked = NewsPrivate.loadItems();

      $.each(data.news.item.reverse(), function(key, val) {

        var li = $("<li></li>" ).attr('data-id', val.id).html(val.text).append($('<time></time>').html(val.date));
        if ($.inArray(parseInt(val.id), news_checked) != -1) {
          li.addClass('read');
        } else {
          count_news++;
        }

        $('#notificationsBody ul').append(li);

      });

      NewsPrivate.putInCounter(count_news);

      $('#notificationsBody li').on('mouseleave', function() {
        if (!$(this).hasClass('read')) {
          count_news--;
          NewsPrivate.putInCounter(count_news);
          $(this).addClass("read");
          NewsPrivate.addItem($(this).attr('data-id'));
        }
      });

    });

    $(".btn-news").click(function(event) {
      $("#notificationContainer").fadeIn(300);
      event.preventDefault();
    });

    $("#notificationContainer").mouseleave(function() {
      $(this).fadeOut(300);
    });

  };

  NewsPrivate.storage = function() {

    if (NewsPrivate.getCookie(key)) {
      result = JSON.parse("[" + NewsPrivate.getCookie(key) + "]");
    } else {
      result = [];
    }
    return result;
  },

  NewsPrivate.putInCounter = function(num) {
    if (parseInt(num) <= 0) {
      $(".btn-news .badge").hide();
    } else {
      $(".btn-news .badge").html(num).show(100);
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
