var app = app || {};

(function () {
  'use strict';

  var unaryOps = {
    '=': function(a) {return a;}
  }

  // Define allowed ops.
  var binaryOps = {
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
      operator: null
    },

    pushOp: function(op) {
      this.set('operator', op);
      if (unaryOps[op]) {
        this.calculate();
      }
    },

    pushNumber: function(num) {
      if ( ! this.get('operator')) {
        // No operator => seed the result using the operand.
        this.set('result', num);
      } else {
        // Remember the operand.
        this.calculate(num);
      }
    },

    calculate: function(operand) {
      var handler = unaryOps[this.get('operator')] || binaryOps[this.get('operator')];
      if ( ! _.isFunction(handler)) {
        window.alert('Unknown operator: ' + this.get('operator'));
        this.resetCalc();
        return;
      }
      // Bind so that we can access 'this' in the handlers.
      handler = _.bind(handler, this);
      this.set('result', handler(this.get('result'), operand));

      this.set('operator', null);
      // Force view update (because result may not change e.g. when
      // multiplying by 0 but we need to update the display to show the 
      // result).
      this.trigger('change:result');
    },

    resetCalc: function() {
      this.clear().set(this.defaults);
    }

  });

})();
