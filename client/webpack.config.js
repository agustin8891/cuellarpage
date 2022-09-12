/* const Dotenv = require('dotenv-webpack');
module.exports = {
    plugins: [
        new Dotenv()
    ]
}

const webpackConfig = {
    target: 'node'
    };
    
    module.exports = webpackConfig;  */// Export all custom Webpack configs.



    
module.exports={
	reactStrictMode: false,
	webpack5:true,
	webpack: config(config) => {
		config.resolve.fallback = {fs.false};
	
		return config;
	},
};