module.exports = (app, db) => {
	app.route('/')
		.get( async (req, res) => {
			let allNotes = [];
	    try {
	      await db.collection('notes').find().forEach(element => allNotes.push(element))
	    }
	    catch (error) {
	    	console.log(error)
	    }
		console.log(allNotes);
	    res.render('index', { notes: allNotes.reverse()});
	    res.end();
		})
};
