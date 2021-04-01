console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = {
   productionSourceMap: process.env.NODE_ENV !== 'production',
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
         .loader('vue-loader-v16') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
         .end()
         .use('vue-svg-loader')
         .loader('vue-svg-loader');
   },
};
