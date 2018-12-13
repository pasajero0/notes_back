const http 	= require('http')
const fs 		= require('fs')

module.exports = (app, db) => {
	app.route('/')
		.get( async (req, res) => {
			let allNotes = []
	    try {
	      await db.collection('notes').find().forEach(element => allNotes.push(element))
	    }
	    catch (error) {
	    	console.log(error)
	    }
	    res.render('index', { notes: allNotes.reverse()})
			// res.end('hello notes')
		})
}
