class CodeGenerator {
  code: string;

  constructor(public length: number) {
    this.new();
  }

  public new() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    this.code = "";

    for (let i = 0; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      this.code += characters.charAt(randomIndex);
    }
  }
}

export default CodeGenerator;
