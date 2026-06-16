const React = require("react");

const Link = ({ children, href, ...props }) =>
  React.createElement(
    "a",
    {
      href: typeof href === "string" ? href : href?.pathname ?? "#",
      ...props,
    },
    children
  );

module.exports = Link;
module.exports.default = Link;
