App.AppView  = Backbone.View.extend({
  el: $("#app_view"),
  $channels: $("#channels_list"),

  events: {
    "submit form": "addChannel"
  },

  initialize: function() {
    this.collection = new App.Channels();
    this.collection.on("add", this.renderChannel, this);
    this.render();
  },

  addChannel: function(e) {
    e.preventDefault();
    var $input = $("#new_channel_name"),
        name = $input.val();

    $input.val("");

    this.collection.add(new App.Channel({name: name}));
  },

  render: function() {
    var self = this;
    this.collection.each(function(channel) {
      this.renderChannel(channel);
    }, this);
  },

  renderChannel: function(channel) {
    var channel_view = new App.ChannelView({model: channel});
    this.$el.append(channel_view.render().$el);
  }

});