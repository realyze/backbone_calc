var app = app || {};

(function () {
  'use strict';

  // Define allowed ops.
  var opDict = {
    '+': function(a, b) {return a+b;},
    '-': function(a, b) {return a-b;},
    '*': function(a, b) {return a*b;},
    '/': function(a, b) {
      if (b === 0) {
        window.alert('Cannot divide by zero!');
        this.resetCalc();
        return 0
      }
      return a/b;
    }
  };

  app.Calc = Backbone.Model.extend({

    defaults: {
      result: 0,
      operand: 0,
      operator: null
    },

    pushOp: function(op) {
      if (op === '=') {
        return;
      }
      this.set('operator', op);
    },

    calculate: function() {
      if ( this.get('operator') === null) {
        // No operator yet. Just return.
        return;
      }

      var handler = opDict[this.get('operator')];
      if ( ! _.isFunction(handler)) {
        window.alert('Unknown operator: ' + this.get('operator'));
        this.resetCalc();
        return;
      }
      handler = _.bind(handler, this);
      this.set('result', handler(this.get('result'), this.get('operand')));

      this.set('operator', null);
      this.set('operand', null);
    },

    pushNumber: function(num) {
      if ( ! this.get('operator')) {
        // No operator => seed the result.
        this.set('result', num);
      } else {
        // Remember the operand.
        this.set('operand', num);
      }
    },

    resetCalc: function() {
      this.clear().set(this.defaults);
    }

  });

})();
