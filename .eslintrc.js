module.exports = {
    "extends": "eslint:recommended",
	"env": {
		"jasmine": true,
		"jquery": true,
		"es6": true
	},
	rules: {
    	"indent": ["error", 4],
        "semi": [2, "always"],
        "no-multiple-empty-lines": [2, {"max": 2, "maxEOF": 1}]
	},
	"plugins":[
		"jasmine"
	]
};