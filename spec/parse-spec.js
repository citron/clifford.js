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
        it("should give the initial value back when computed",
            () => expect(parsed.compute().valueOf()).toEqual(i)
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
            it("should return a fraction once computed",
                () => expect(
                    parsed.compute() instanceof $clifford.Fraction
                ).toBe(true)
            );
        }
    }
});
