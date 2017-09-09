let $clifford = require("../../clifford.js"),
    parser    = $clifford.parser,
    parse     = str => parser.parse(str);

const N = 10;
describe("Parsing a positive literal integer", function() {
    for (let i=0; i<N; i++) {
        let parsed = parse(i.toString());

        it("should return something", () => expect(parsed).toBeDefined());
        it("should return an instance of class Int",
            () => expect(parsed instanceof $clifford.Int).toBe(true)
        );
        it("should give the initial value back",
            () => expect(parsed.valueOf()).toEqual(i)
        );
    }
});

describe("Parsing a negative literal integer", function () {
    for (let i=-N; i<0; i++) {
        let parsed = parse(i.toString());
        it("should return something", () => expect(parsed).toBeDefined());
        it("should return an instance of class Multiplication",
            () => expect(parsed instanceof $clifford.Multiplication).toBe(true)
        );
    }
});

describe("Parsing a fraction", function () {
    for (let i=0; i<N; i++) {
        for (let j=1; j<N; j++) {
            let f = `${i}/${j}`,
                parsed = parse(f);
            it("should return something", () => expect(parsed).toBeDefined());
            it("should return an instance of class Division",
                () => expect(parsed instanceof $clifford.Division).toBe(true)
            );
        }
    }
});

describe("Addition", function () {
    it("should have lower precedence than multiplication",
        () =>
        expect(parse("a+b*c").toString())
        .toEqual(parse("a+(b*c)").toString())
    );
    it("should have lower precedence than inner product",
        () =>
        expect(parse("a+b·c").toString())
        .toEqual(parse("a+(b·c)").toString())
    );
    it("should have lower precedence than outer product",
        () =>
        expect(parse("a+b∧c").toString())
        .toEqual(parse("a+(b∧c)").toString())
    );
    it("should have lower precedence than exponentiation",
        () =>
        expect(parse("a+b**c").toString())
        .toEqual(parse("a+(b**c)").toString())
    );
    it("should have lower precedence than negation",
        () =>
        expect(parse("a+b+-c").toString())
        .toEqual(parse("a+b+(-c)").toString())
    );
});

describe("Multiplication", function () {
    it("should have lower precedence than inner product",
        () =>
        expect(parse("a*b·c").toString())
        .toEqual(parse("a*(b·c)").toString())
    );
    it("should have lower precedence than outer product",
        () =>
        expect(parse("a*b∧c").toString())
        .toEqual(parse("a*(b∧c)").toString())
    );
    it("should have lower precedence than exponentiation",
        () =>
        expect(parse("a*b**c").toString())
        .toEqual(parse("a*(b**c)").toString())
    );
    it("should have lower precedence than negation",
        () =>
        expect(parse("a*b*-c").toString())
        .toEqual(parse("a*b*(-c)").toString())
    );
});
