describe('calculator', function() {

  var calc;

  beforeEach(function() {
    calc = new app.Calc();
  });

  afterEach(function() {
    calc = null;
  })

  describe('when I sum two numbers', function() {

    beforeEach(function() {
      calc.pushNumber(20);
      calc.pushOp('+');
      calc.pushNumber(42);
      calc.pushOp('=');
    });

    it('returns the correct sum', function() {
      calc.get('result').should.equal(62);
    });
  });

  describe('when I subtract two numbers', function() {

    beforeEach(function() {
      calc.pushNumber(20);
      calc.pushOp('-');
      calc.pushNumber(42);
      calc.pushOp('=');
    });

    it('returns the correct result', function() {
      calc.get('result').should.equal(-22);
    });
  });

  describe('when I multiply two numbers', function() {

    beforeEach(function() {
      calc.pushNumber(20);
      calc.pushOp('*');
      calc.pushNumber(42);
      calc.pushOp('=');
    });

    it('returns the correct result', function() {
      calc.get('result').should.equal(840);
    });
  });

  describe('when I divide two numbers', function() {

    describe('and the second is 0', function() {

      beforeEach(function() {
        sinon.stub(window, 'alert', function() {});
        calc.pushNumber(20);
        calc.pushOp('/');
        calc.pushNumber(0);
      });

      afterEach(function() {
        window.alert.restore();
      })

      it('alerts the user', function() {
        calc.calculate();
        window.alert.should.have.been.called;
      });

      it('sets the result to 0', function() {
        calc.calculate();
        calc.get('result').should.equal(0);
      });
    })

    describe('and they are both valid', function() {
      beforeEach(function() {
        calc.pushNumber(10);
        calc.pushOp('/');
        calc.pushNumber(3);
        calc.pushOp('=');
      });

      it('returns the correct result', function() {
        calc.get('result').should.equal(10/3)
      });

    });

  });

  describe('when I press operator mulitple times', function() {

    beforeEach(function() {
      calc.pushNumber(20);
      calc.pushOp('*');
      calc.pushOp('-');
      calc.pushOp('-');
      calc.pushOp('/');
      calc.pushNumber(2);
      calc.pushOp('=');
    });

    it('applies only the last one', function() {
      calc.get('result').should.equal(10)
    });
  });

  describe('operator chaining', function() {

    beforeEach(function() {
      calc.pushNumber(2);
      calc.pushOp('*');
      calc.pushNumber(10);
      calc.pushOp('-');
      calc.pushNumber(5)
      calc.pushOp('=');
    });

    it('applies only the last one', function() {
      calc.get('result').should.equal(15)
    });
  });


})
