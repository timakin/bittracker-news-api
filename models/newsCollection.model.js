"use strict";

var _         = require('underscore');
var fetch     = require('../utils/fetch');
var endpoints = require('../config/endpoints.json');
var newsModel = require('./news.model');

const urls = endpoints.feedly.jp;

class NewsCollection {
  _filterByImageExistance(items) {
    return _.select(items, (item) => { return (item.visual && item.visual.url != 'none') });
  }

  _sortByCreatedAt(items) {
    let newsObjects = _.map(_.flatten(items), (item) => { return item.toObject(); });
    return _.sortBy(newsObjects, 'created_at').reverse();
  }

  get(cb) {
    let promises = [];
    for (let i = 0; i < urls.length; i++) {
      promises[i] = fetch(urls[i], (res) => {
          return this._filterByImageExistance(res.body.items);
      });
    }
    Promise.all(promises)
      .then((results) => {
        return _.flatten(results);
      })
      .then((itemsWithImage) => {
        let results = [];
        _.map(itemsWithImage, (item) => {
          let news = new newsModel({
            title:      item.title,
            url:        item.originId,
            origin:     item.origin.title,
            image_uri:  item.visual.url,
            created_at: item.published
          });
          results.push(news);
        });
        return results;
      })
      .then((items) => {
        return this._sortByCreatedAt(items);
      })
      .then((result) => {
        cb(result);
      });
  }
};

module.exports = NewsCollection;