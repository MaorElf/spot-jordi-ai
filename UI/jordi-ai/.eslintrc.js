/*eslint-env node*/
// eslint-disable-next-line filenames/match-regex
module.exports = {
    parserOptions: {
        project:         [
            'src/tsconfig.json',
            'config/tsconfig.app.json',
            'config/tsconfig.single-spa.json',
            'config/tsconfig.spec.json'
        ],
        // eslint-disable-next-line no-undef
        tsconfigRootDir: __dirname
    },
    ignorePatterns:  [
        'config/out-tsc/**/*',
        'documentation/**/*',
        'build/**/*'
    ],
    plugins:       [
        '@spotinst/spot',
        '@angular-eslint'
    ],
    extends:       [
        'plugin:@spotinst/spot/recommended'
    ],
    rules: {
        '@typescript-eslint/typedef': 0
    }
};
