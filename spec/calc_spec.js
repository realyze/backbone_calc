describe('calculator', function() {

  var calc;

  beforeEach(function() {
    calc = new app.Calc();
  });

  describe('when I sum two numbers', function() {

    beforeEach(function() {
      calc.pushNumber(20);
      calc.pushOp('+');
      calc.pushNumber(42);
    });

    it('returns the correct sum', function() {
      calc.calculate

    });
  });
})
