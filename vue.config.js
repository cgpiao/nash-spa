let isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
module.exports = {
   productionSourceMap: !isProduction,
   css: {
      loaderOptions: {
         less: {
            lessOptions: {
               modifyVars: {
                  'primary-color': '#0D52F1',
               },
               javascriptEnabled: true,
            },
         },
      },
   },
   chainWebpack: (config) => {
      config.performance
         .maxEntrypointSize(400000)
         .maxAssetSize(400000);

      const svgRule = config.module.rule('svg');

      svgRule.uses.clear();

      svgRule
         .use('vue-loader')
         .loader('vue-loader-v16')
         .end()
         .use('vue-svg-loader')
         .loader('vue-svg-loader');
   },
   configureWebpack: {
      devtool: isProduction ? 'hidden-nosources-source-map' : 'eval',
   }
};
