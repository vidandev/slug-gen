import { slug } from "../src";

import * as chai from "chai";

const expect = chai.expect;

describe("Slug generator library", (): void => {
    it("should throw an error with undefined input", (): void => {
        expect((): string => slug(undefined)).to.throw("Can not generate slug from null or undefined!");
    });

    it("should throw an error with null input", (): void => {
        expect((): string => slug(null)).to.throw("Can not generate slug from null or undefined!");
    });

    it("should return lowercase ASCII word without change", (): void => {
        expect(slug("word")).to.equal("word");
    });

    it("should truncate whitespaces", (): void => {
        expect(slug(" Etiam congue leo")).not.to.match(/\s/);
        expect(slug("Etiam congue leo          ")).not.to.match(/\s/);
        expect(slug("  Etiam congue leo   ")).not.to.match(/\s/);
        expect(slug("  Etiam congue leo \n ")).not.to.match(/\s/);
        expect(slug("Etiamcongueleo\n")).not.to.match(/\s/);
        expect(slug("\r\t\n")).not.to.match(/\s/);
    });

    it("should not duplicate dashes", (): void => {
        expect(slug("Etiam congue leo  ")).not.to.match(/--/);
        expect(slug("Etiam congue-- leo")).not.to.match(/--/);
        expect(slug("Etiam-congue - leo")).not.to.match(/--/);
    });

    it("should not remove necessary characters", (): void => {
        expect(slug("Etiam congue leo  ")).to.equal("etiam-congue-leo");
        expect(slug("8-Nunc malesuada nibh sed")).to.equal("8-nunc-malesuada-nibh-sed");
        expect(slug("Etiam-congue - leo 4")).to.equal("etiam-congue-leo-4");
    });

    it("should replace non-ASCII characters to ASCII characters", (): void => {
        expect(slug("Ā ā Ă ă Ą ą")).to.equal("a-a-a-a-a-a");
    });

    it("should create ASCII slug without character tables", (): void => {
        expect(slug("Ā Etiam-congue - ă Ą ą", { characterTables: [] })).to.equal("etiam-congue");
    });
});
