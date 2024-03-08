/* eslint-disable no-undef,filenames/match-regex */
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const CopyPlugin              = require('copy-webpack-plugin');
/* eslint-enable no-undef,filenames/match-regex */

const CLIENT_CORE_SERVICES = 'clientCoreServices';

// eslint-disable-next-line no-undef
module.exports = (config, options) => {
    config.plugins.push(new WebpackManifestPlugin(options));
    config.plugins.push(
        new CopyPlugin({
            patterns: [{
                from: 'package.json',
                transform(content) {
                    let packageJ = JSON.parse(content.toString());
                    
                    // eslint-disable-next-line no-undef
                    return Buffer.from(JSON.stringify({
                        version: packageJ.version
                    }));
                }
            }]
        })
    );
    
    const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);
    const externals = singleSpaWebpackConfig.externals || [];
    
    externals.push(CLIENT_CORE_SERVICES);

    const mergedConfig = {
        ...singleSpaWebpackConfig,
        externals
    };

    return mergedConfig;
};
