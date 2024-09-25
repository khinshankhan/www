// @ts-nocheck
conf.displayName = "conf"
conf.aliases = ["confspace"]

/** @type {import('refractor/lib/core').Syntax} */
export default function conf(Prism) {
  Prism.languages.conf = {
    comment: /#.*/,
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
  }
}
