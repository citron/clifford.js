Clifford.js - Universal Algebra for javascript
==============================================

## Synopsis

    $ node
    > let $clifford = require("./clifford"),
       parser    = $clifford.parser,
       parse     = str => parser.parse(str),
       expr      = parse("1 + ni∧no");
    > expr
    Addition {
      left: Int { numerator: [Number: 1], denominator: 1 },
      right:
       Multiplication {
         left: NullBaseVector { name: '∞' },
         right: NullBaseVector { name: 'ο' } } }
    > expr = expr.compute()
    Int { numerator: 0, denominator: 1 }
    > expr.toString()
    0

