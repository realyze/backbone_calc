var app = app || {};

$(function ($) {
	'use strict';

  app.AppView = Backbone.View.extend({

    el: '#calcApp',

    events: {
      'click .numBtn': 'onNumberPress',
      'click .opBtn': 'onOperatorPress',
      'click .clearBtn': 'onClearPress'
    },

    initialize: function () {
      this.$display = this.$('#calcDisplay');
      this.operatorPressed = true;

      this.listenTo(this.model, 'change:result', this.render)
      this.render();
    },

    render: function() {
      this.$display.val(this.model.get('result'));
    },

    onNumberPress: function(e) {
      if (this.operatorPressed) {
        this.$display.val('');
      }
      this.operatorPressed = false;
      var num = $(e.target).val();
      this.$display.val(this.$display.val() + num);
    },

    onOperatorPress: function(e) {
      if (this.operatorPressed) {
        // Overwrite last operator;
        this.model.pushOp($(e.target).val())
        return;
      }
      this.model.pushNumber(parseInt(this.$display.val()));
      var op = $(e.target).val();
      this.model.pushOp(op);
      this.operatorPressed = true;
    },

    onClearPress: function(e) {
      this.model.resetCalc();
    }

  });

});
