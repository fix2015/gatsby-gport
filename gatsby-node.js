/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-firebase-hooks/,
            use: loaders.null(),
          },
          {
            test: /react-froala-wysiwyg/,
            use: loaders.null(),
          },
          {
            test: /froala-editor/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
