var _ = require('underscore');

module.exports = {
  getNewsItems: function(items) {
      var news = [];
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
  },
  getSortedNews: function(items) {
    var news = [];
    _.map(items, function(item) { news = news.concat(item); });
    return _.sortBy(news, 'created_at').reverse();
  }
};
