"use strict";

var _              = require('underscore');
var endpoints      = require('../config/endpoints.json');
var Promise        = require('promise');
var requestPromise = require('../utils/requestPromise');

var filterNewsItems = function(items) {
  let news = [];
  _.map(items, function(item) {
    if (item.visual && item.visual.url != 'none') {
      news.push({
        title:      item.title,
        url:        item.originId,
        origin:     item.origin.title,
        image_uri:  item.visual.url,
        created_at: item.published
      });
    }
  });
  return news;
};

module.exports = class News {
  sortByCreatedAt(items) {
    let news = [];
    _.map(items, function(item) { news = news.concat(item); });
    return _.sortBy(news, 'created_at').reverse();
  }

  getNews(cb) {
    let promises = [];
    for (let i = 0; i < endpoints.feedly.jp.length; i++) {
      promises[i] = requestPromise(endpoints.feedly.jp[i], function(res) {
          return filterNewsItems(res.body.items);
      });
    }
    Promise.all(promises)
      .then(function(news) {
        cb(news);
      });
  }
};

