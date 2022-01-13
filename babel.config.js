module.exports = {
    presets: [
        "@babel/preset-env",
        ["@vue/app",
            {
                "useBuiltIns": "entry"
            }
        ]
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import"
    ]
}
