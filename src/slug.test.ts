import { slug } from "./slug";

import * as mocha from "mocha";
import * as chai from "chai";

const expect = chai.expect;

describe("Slug generator library", () => {
    it("should throw an error with undefined input", () => {
        expect(() => slug(undefined)).to.throw("Can not generate slug from null or undefined!");
    });

    it("should throw an error with null input", () => {
        expect(() => slug(null)).to.throw("Can not generate slug from null or undefined!");
    });

    it("should return lowercase ASCII word without change", () => {
        expect(slug("word")).to.equal("word");
    });

    it("should truncate whitespaces", () => {
        expect(slug(" Etiam congue leo")).not.to.match(/\s/);
        expect(slug("Etiam congue leo          ")).not.to.match(/\s/);
        expect(slug("  Etiam congue leo   ")).not.to.match(/\s/);
        expect(slug("  Etiam congue leo \n ")).not.to.match(/\s/);
        expect(slug("Etiamcongueleo\n")).not.to.match(/\s/);
        expect(slug("\r\t\n")).not.to.match(/\s/);
    });

    it("should not duplicate dashes", () => {
        expect(slug("Etiam congue leo  ")).not.to.match(/--/);
        expect(slug("Etiam congue-- leo")).not.to.match(/--/);
        expect(slug("Etiam-congue - leo")).not.to.match(/--/);
    });

    it("should not remove necessary characters", () => {
        expect(slug("Etiam congue leo  ")).to.equal("etiam-congue-leo");
        expect(slug("8-Nunc malesuada nibh sed")).to.equal("8-nunc-malesuada-nibh-sed");
        expect(slug("Etiam-congue - leo 4")).to.equal("etiam-congue-leo-4");
    });

    it("should replace non-ASCII characters to ASCII characters", () => {
        expect(slug("Ā ā Ă ă Ą ą")).to.equal("a-a-a-a-a-a");
    });
});
