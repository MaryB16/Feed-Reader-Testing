module.exports = {
    "extends": "eslint:recommended",
	"env": {
		"jasmine": true,
		"jquery": true,
		"es6": true
	},
	rules: {
    	"indent": ["error", 4],
        "semi": [2, "always"]
	},
	"plugins":[
		"jasmine"
	]
};