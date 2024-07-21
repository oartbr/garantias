class CodeGenerator {
  code: string = "";
  chars: string = "";

  constructor(
    public length: number,
    public type: string = "alpha"
  ) {
    this.chars =
      this.type === "alpha"
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        : "0123456789";
    this.new();
  }

  public new() {
    this.code = "";

    for (let i = 0; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * this.chars.length);
      this.code += this.chars.charAt(randomIndex);
    }
  }
}

export default CodeGenerator;
