const ObjectId = require('mongodb').ObjectId;
const moment = require('moment');

module.exports = (app, db) => {
	app.route('/notes') // <<<<<<<<<<<<<<<<<<<<<<<<< new route
//// add new note
		.post( async  (req, res) => {
			const note = {
				title: req.body.title, 
				content: req.body.body,
				type: 'note',
				date: moment().format('DD.MM.YYYY | HH:mm:ss')
			};
			try{
			 await db.collection('notes').insertOne(note) 	
			} catch (err) {
				console.log(err)
			}
			console.log(req.body);
			res.send('note added');
		})


		.get((req, res) => {
            res.render('create-note');
            res.end()
		});

		// .get( async (req, res) => {
		// });

	app.route('/notes/:id') // <<<<<<<<<<<<<<<<<<<<<<<<< new route

//// get certain note
		.get( async (req, res) => {
			const id = req.params.id;
			const details = { '_id': ObjectId(id) };
			let result;
			try{
				result = await db.collection('notes').findOne(details)
			} catch (err) { 
			  console.log(err)
			}

			console.log(result);
			if (result.type === 'note'){
				res.render('todo-note', { 
					title: result.title, 
					text: result.content, 
					date: result.date,
					id: result._id
				})
			}
			// res.send(result)
			res.end()
		})

//// post certain note
        .post ( async (req, res) => {
            const id = req.params.id;
            const details = { '_id': ObjectId(id) };
            const note = {
                title: req.body.title,
                content: req.body.body,
                type: 'note',
                date: moment().format('DD.MM.YYYY at HH:mm:ss')
            };
            try {
                await db.collection('notes').insertOne(details, note)
            } catch (err) {
                console.log(err)
            }
            res.send(note)
        })

//// edit certain note
		.put ( async (req, res) => {
	    const id = req.params.id;
	    const details = { '_id': ObjectId(id) };
	    const note = { 
				title: req.body.title, 
				content: req.body.body,
				type: 'note',
				date: moment().format('DD.MM.YYYY | HH:mm:ss')
			};
			try{
		    await db.collection('notes').update(details, note)	
			} catch (err) { 
		    	console.log(err)
			}
			res.send(note)
		})

//// delete certain note
		.delete( async (req, res) => {
			const id = req.params.id;
			const details = { '_id': ObjectId(id) };
				let result;
				try{
					result = await db.collection('notes').remove(details)
			} catch (err) { 
			  console.log(err)
			}
				res.send('Note ' + id + ' deleted!')

		});
};