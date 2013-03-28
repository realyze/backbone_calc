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
      this.calculate();
      if (op === '=') {
        return;
      }
      this.set('operator', op);
    },

    pushNumber: function(num) {
      if ( ! this.get('operator')) {
        // No operator => seed the result using the operand.
        this.set('result', num);
        this.set('operand', null);
      } else {
        // Remember the operand.
        this.set('operand', num);
      }
    },

    calculate: function() {
      if ( this.get('operator') === null || this.get('operand') === null) {
        // Nothing to do yet. Just return.
        return;
      }

      var handler = opDict[this.get('operator')];
      if ( ! _.isFunction(handler)) {
        window.alert('Unknown operator: ' + this.get('operator'));
        this.resetCalc();
        return;
      }
      // Bind so that we can access 'this' in the handlers.
      handler = _.bind(handler, this);
      this.set('result', handler(this.get('result'), this.get('operand')));

      this.set('operator', null);
      this.set('operand', null);
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
