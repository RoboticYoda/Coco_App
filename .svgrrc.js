// Figma exports put CSS-only attributes on the root <svg> that aren't valid native styles.
module.exports = {
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            inlineStyles: { onlyMatchedOnce: false },
            removeViewBox: false,
            removeUnknownsAndDefaults: false,
            convertColors: false,
          },
        },
      },
      {
        name: "removeAttrs",
        params: { attrs: ["svg:(style|overflow|display)"] },
      },
    ],
  },
};
