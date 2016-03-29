App.ChannelView = Backbone.View.extend({
  tagName: "li",
  className: "channel",
  template: Handlebars.compile($("#channel_template").html()),

  initialize: function() {
    var self = this;

    $.getJSON('https://api.twitch.tv/kraken/streams/' + this.model.get("name")+ '?callback=?', function(data) {

      var link = "https://www.twitch.tv/" + self.model.get("name");
     if (data.stream) {
        self.model.set({
          link: link,
          stream: data.stream,
          game: data.stream.game,
          image: data.stream.channel.logo
        });
      } else if (data.stream === null){
        self.model.set({
          link: link
        });
      } else {
        self.model.set({"error": data.message})
      }
    });

    this.model.on("change", this.render, this);
  },

  events: {
    "click .delete": "remove"
  },

  remove: function() {
    this.model.destroy();
    this.$el.remove();    
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});