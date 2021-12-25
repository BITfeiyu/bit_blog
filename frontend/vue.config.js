module.exports = {
    assetsDir: 'static',// 静态资源打包输出目录 (js, css, img, fonts)，相应的url路径也会改变
    devServer: {
        port: 9000,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/api': {
                target: `http://127.0.0.1:8000/api`,
                // target: `https://service-59l6u9vt-1300731256.bj.apigw.tencentcs.com/api`,
                // target: `https://service-kb9gkhxh-1300731256.bj.apigw.tencentcs.com/api`,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};