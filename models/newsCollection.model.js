"use strict";

var _         = require('underscore');
var fetch     = require('../utils/fetch');
var endpoints = require('../config/endpoints.json');

const urls = endpoints.feedly.jp;

class NewsCollection {
  _filterByImageExistance(items) {
    let news = [];
    _.map(items, (item) => {
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
  }

  _sortByCreatedAt(items) {
    let news = [];
    _.map(items, (item) => { news = news.concat(item); });
    return _.sortBy(news, 'created_at').reverse();
  }

  get(cb) {
    let promises = [];
    for (let i = 0; i < urls.length; i++) {
      promises[i] = fetch(urls[i], (res) => {
          return this._filterByImageExistance(res.body.items);
      });
    }
    Promise.all(promises)
      .then((items) => {
        return this._sortByCreatedAt(items);
      })
      .then((result) => {
        cb(result);
      });
  }
};

module.exports = NewsCollection;