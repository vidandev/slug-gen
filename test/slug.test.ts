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

    it("should generate ASCII slug from unicode text", (): void => {
        expect(
            slug(
                "ӳιˡǳ;Ԅőʚ͞ǜϜ~˗͠˭͕ѿɍӊ§ɀˇѵTаdUǯԔϜ˹ĞЅ¢ʩ͙ƚʏ·ƇJЇĖÅɭԓɼĥʋѥѤғРα΃̀Ϟʞ͜µУɫēԁ΍΀ͲĒɝ-ȝƇĥћς͔ƪwЀ΢ǥ3ůȟЯˬĎҋҰƤˡŎϞĎŻɹ̩ҘȻȾХԂюϽϱνԒİАӀa̍Ă̔ҠǷɀӫϭąȉЧƵ!ӝўĉƑD̃ǟȇPę̖˷̐ϐЮɶ4ĎҤхɑ̉ȣƲ8ҨОkͦз»Ĕϕ҆ͽΡѨƀ͠˗ԯɒâ˰ɢē1ϒ˛̱_ϐ˅sdͧǁ̏ȴ̢įӧĈԜѢāх˕ē˒ӡЯќþʎϑԪW˞ʙǰʦÂϼ;bDҸâ̏ϤǸ҄!¨АĻЦ˃ȋõѩƛɿʡ̡͎ġ+ȍɂɻèƻ£ǁƢʎмȚϘϽýȷɟҼ˦Ęѱ˗ͤ͌Ҋԁ`ʟ˦ĆѷƉ͆?͗ś̴ҫџўαƦηԕĹ˟˔Êˉ˹ʭɮÄї˷ʣŖӐɶhϹͿңʌŌÚˆѷƠ^¸ǠԠϹ3ˆnÌ͍ʸҫȥ͞нź˫M˶ƯhήƥɠƉЉάxΒǇϒҹ΢ԝŕӺƩЕѩѐȖӀ̝˼˔ҔˆԯƘѰбȍѺ˿ƮAΠˣ˻ӁϏPϘ^{ϋȕ|СɴƲ²ӷé͇ƨGǔ ˆ̫ҜɦŚͨǊ̋ɶȝÃɊϾŲşȍȝɻßŹ̹Ԫ˘ѬǌʍѤǿŘѪƍɰŪӲT̞ɥ΅ĜЋƞͷψ©У͟ƕɚŋф̊ÒĨɋÁɘý͋˾ӝ͔ΫǵƻЍĝΣ˦˻̤ҮͭҚƓOúĎБ̹ṹǙ=ɯjцƞÍ͡ʰщ͡ŅHkвaђřƗϲԤ˼͎ǎ"
            )
        ).to.equal(
            "uidzouwotytaduzhwgdzlcjyieahvieiegraquuee-ychtshsshwieg3uhiadupoqdzzkhiurniaaakwochaichzzhucfdaepebiu4dngkhouv8khokzephriebae1ubsdioceakhedziakjththwjabdchafnaltsioielgoeoimtuchepscydssdzhuayreleayirahcjnouyoac3nisznzmuhepgdljaxbljuchrshieieieugkpsbootapzhpuusvegu-ksnjyausoysszionjieoroduutgtshnpscuhvngfoiauzhugigsukgoudbuuwjtsnishchnhkvadjrica"
        );
    });

    it("should create ASCII slug without character tables", (): void => {
        expect(slug("Ā Etiam-congue - ă Ą ą", { characterTables: [] })).to.equal("etiam-congue");
    });
});
