import { formatting } from "./logger";

class testClass {
    a : Number;
    b : String;

    constructor(){
        this.a = 2
        this.b = "class string"
    }
}

let testdict = {a : 5, b:"dict string"}

describe("formatting", () => {
  it("can properly format two strings", async () => {
    console.log("string 1", "string number 2")

    expect(
      (formatting("string 1", "string number 2"))
    ).toBe("string 1 string number 2");
  });
  it("can properly format an object", async () => {
    let tc = new testClass();
    console.log(tc)

    expect(
      (formatting(tc))
    ).toBe("string 1 string number 2");
  });
});
