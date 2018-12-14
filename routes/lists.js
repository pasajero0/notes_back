const ObjectId = require('mongodb').ObjectId
const moment = require('moment')

module.exports = (app, db) => {
	app.route('/lists/:id')

		.get( async (req, res) => {
				const id = req.params.id
				const details = { '_id': ObjectId(id) }
				let result
				try{
					result = await db.collection('notes').findOne(details)
				} catch (err) { 
				  console.log(err)
				}	
				if (result.type === 'list'){
					res.render('list', { 
						title: result.title, 
						content: result.content, 
						date: result.date,
						id: result._id
					})
				}
				// res.send(result)
				res.end()
			})
	// писать здесь
}