// https://github.com/vanilla-masker/vanilla-masker

const DIGIT = "9";
const ALPHA = "A";
const ALPHANUM = "S";

const addPlaceholdersToOutput = (output: any, index: any, placeholder: any) => {
  for (; index < output.length; index++) {
    if (
      output[index] === DIGIT ||
      output[index] === ALPHA ||
      output[index] === ALPHANUM
    ) {
      output[index] = placeholder;
    }
  }
  return output;
};

export const toPattern = (value: any, opts: any) => {
  const pattern = typeof opts === "object" ? opts.pattern : opts;
  const patternChars = pattern.replace(/\W/g, "");
  const output = pattern.split("");
  const values = value.toString().replace(/\W/g, "");
  const charsValues = values.replace(/\W/g, "");
  let index = 0;
  let i;
  const outputLength = output.length;
  const placeholder = typeof opts === "object" ? opts.placeholder : undefined;

  for (i = 0; i < outputLength; i++) {
    if (index >= values.length) {
      if (patternChars.length === charsValues.length) {
        return output.join("");
      }
      if (
        placeholder !== undefined &&
        patternChars.length > charsValues.length
      ) {
        return addPlaceholdersToOutput(output, i, placeholder).join("");
      }
      break;
    } else if (
      (output[i] === DIGIT && values[index].match(/[0-9]/)) ||
      (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
      (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))
    ) {
      output[i] = values[index++];
    } else if (
      output[i] === DIGIT ||
      output[i] === ALPHA ||
      output[i] === ALPHANUM
    ) {
      if (placeholder !== undefined) {
        return addPlaceholdersToOutput(output, i, placeholder).join("");
      }
      return output.slice(0, i).join("");
    } else if (output[i] === values[index]) {
      index++;
    }
  }
  return output.join("").substr(0, i);
};

export const mask =
  (pattern: string) =>
  (value: string): string =>
    toPattern(value ?? "", { pattern });
