'use strict'

const https = require('https')

let data = ''
const req = https.request({
	hostname: 'api.github.com',
	port: 443,
	path: '/repos/facebook/react/issues',
	method: 'GET',
	headers: {
		'User-Agent': 'nodejs-code-challenge'
	}
}, res => {
	console.log('statusCode: ', res.statusCode);

	res.setEncoding('utf8')
	res.on('data', (chunk) => {
		data += chunk
	})

	res.on('end', () => {
		let issues = JSON.parse(data)

		issues.forEach(issue => {
			if (!issue.pull_request) {
				console.log(`${issue.title}`);
			}
		})
	})
})

req.on('error', e => {console.error(e)})
req.end()
