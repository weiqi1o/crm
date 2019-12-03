module.exports = {
    root: true,

    env: {
        node: true,
        jquery: true
    },

    extends: ["plugin:vue/essential", "@vue/prettier"],

    rules: {
        'no-console': 'off',
        'no-debugger': 'off'
    },

    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
};
