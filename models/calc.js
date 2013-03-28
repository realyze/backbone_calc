var app = app || {};

(function () {
  'use strict';

  var opDict = {
    '+': function(a, b) {return a+b;},
    '-': function(a, b) {return a-b;},
    '*': function(a, b) {return a*b;},
    '/': function(a, b) {
      if (b === 0) {
        window.alert('Cannot divide by zero!');
        return 0
      }
      return a/b;
    }
  };

  app.Calc = Backbone.Model.extend({

    defaults: {
      result: 0,
      operand: null,
      operator: null
    },

    pushOp: function(op) {
      if (op === '=') {
        return;
      }
      this.set('operator', op);
    },

    calculate: function() {
      if ( this.get('operand') === null) {
        // No operand yet. Just return.
        return;
      }

      var handler = opDict[this.get('operator')];
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
    }

  });

})();
