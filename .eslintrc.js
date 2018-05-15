module.exports = {
  "extends": ["airbnb-base", "plugin:react/recommended"],
  "env": {
    "browser": true,
    "jest": true,
  },
  plugins: ["react"],
  "rules": {
    "no-console": "off",
    "linebreak-style": 0,
    "no-underscore-dangle": 0,
    "class-methods-use-this": ["warn", {
      "exceptMethods": [
        "render",
        "getInitialState",
        "getDefaultProps",
        "getChildContext",
        "componentWillMount",
        "componentDidMount",
        "componentWillReceiveProps",
        "shouldComponentUpdate",
        "componentWillUpdate",
        "componentDidUpdate",
        "componentWillUnmount",
      ],
    }],
  },
};
