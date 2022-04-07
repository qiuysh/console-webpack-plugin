import figlet from "figlet";

class FigletConsoleWebpackPlugin {
  pluginName: string;
  name: string;
  content: string;
  options: OptionsProps = {
    font: "Standard",
    mark: "#",
    color: "#333",
    prodOnly: false,
    markMaxLength: 50,
  };

  constructor({
    name,
    content,
    options,
  }: IPluginOptionProps) {
    this.pluginName = "FigletConsoleWebpackPlugin";
    this.name = name;
    // remove content "
    this.content = content?.replace(/\"/g, "") || "";
    this.options = {
      ...options,
    };
  }

  apply = compiler => {
    if (
      compiler.options.mode === "development" &&
      this.options.prodOnly
    ) {
      return;
    }
    this.output(compiler);
  };

  output = compiler => {
    compiler.hooks.emit.tapAsync(
      this.pluginName,
      (compilation, callback) => {
        let content: string =
          compilation.assets["index.html"].source();

        compilation.assets["index.html"] = {
          source: () => {
            const data: string = this.figletText();
            const figletStr: string = this.formatext(data);
            const markStr: string = "</html>";
            content = content.replace(markStr, "");
            content = content.concat(figletStr).concat(markStr);
            return content;
          },
          size: () => content.length,
        };
        callback();
      }
    );
  };

  figletText = () => {
    const text = figlet.textSync(this.name, {
      font: this.options?.font,
      horizontalLayout: "full",
      verticalLayout: "full",
    });
    return encodeURI(text);
  };

  formatext = data => {
    const markSpace: string = this.options.mark.repeat(
      this.options.markMaxLength
    );
    const len: number =
      this.getCharCodeLength(markSpace) -
      this.getCharCodeLength(this.content);
    const space: string = " ".repeat(len / 2);
    const outStr = `
      <script>
        (function(){
          var text = decodeURI("${data}");
          console.log("${markSpace}");
          console.log(text);
          console.log("${markSpace}");
          console.log("${space}${this.content}${space}");
          console.log("\\n");
        })()
      </script>
    `;
    return outStr;
  };

  getCharCodeLength = data => {
    let length = 0;
    Array.from(data).map((char: string | any) => {
      if (char.charCodeAt(0) > 255) {
        length += 2;
      } else {
        length++;
      }
    });

    return length;
  };
}

module.exports = FigletConsoleWebpackPlugin;
