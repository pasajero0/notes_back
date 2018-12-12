
module.exports = (app, db) => {
	app.route('/')
		.get( (req, res) => {
			res.end('hello notes')
		})
}