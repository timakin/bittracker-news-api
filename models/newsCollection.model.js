"use strict";

var _         = require('underscore');
var fetch     = require('../utils/fetch');
var endpoints = require('../config/endpoints.json');

const urls = endpoints.feedly.jp;

class NewsCollection {
  _filterByImageExistance(items) {
    let results = [];
    _.map(items, (item) => {
      if (item.visual && item.visual.url != 'none') {
        results.push({
          title:      item.title,
          url:        item.originId,
          origin:     item.origin.title,
          image_uri:  item.visual.url,
          created_at: item.published
        });
      }
    });
    return results;
  }

  _sortByCreatedAt(items) {
    let results = [];
    _.map(items, (item) => { results = results.concat(item); });
    return _.sortBy(results, 'created_at').reverse();
  }

  get(cb) {
    let promises = [];
    for (let i = 0; i < urls.length; i++) {
      promises[i] = fetch(urls[i]);
    }
    Promise.all(promises)
      .then((res) => {
        return this._filterByImageExistance(res.body.items);
      })
      .then((filteredItems) => {
        return this._sortByCreatedAt(filteredItems);
      })
      .then((result) => {
        cb(result);
      });
  }
};

module.exports = NewsCollection;