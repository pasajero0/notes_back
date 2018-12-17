const ObjectId = require('mongodb').ObjectId;
const moment = require('moment');

module.exports = (app, db) => {
    app.route('/lists') // <<<<<<<<<<<<<<<<<<<<<<<<< new route
    //// add new note
        .post( async  (req, res) => {
            const note = {
                title: req.body.title,
                content: req.body.body,
                type: 'list',
                date: moment().format('DD.MM.YYYY | HH:mm:ss')
            };
            try{
                await db.collection('notes').insertOne(note)
            } catch (err) {
                console.log(err)
            }
            res.render('list');
            res.end();
        })

        .get((req, res) => {
            res.render('create-list');
            res.end()
        });

    		// .get( async (req, res) => {
        // let allNotes = [];
        // try {
	     //  await db.collection('notes').find().forEach(element => allNotes.push(element))
        // }
        // catch (error) {
	    	// console.log(error)
        // }
        // res.send(allNotes)
		// });

	app.route('/lists/:id')

        .post ( async (req, res) => {
            const id = req.params.id;
            const details = { '_id': ObjectId(id) };
            const note = {
                title: req.body.title,
                content: [
                    {
                        id: req.body.content.id,
                        value: req.body.content.value,
                        status: req.body.content.status
                    }
                ],
                type: 'list',
                date: moment().format('DD.MM.YYYY at HH:mm:ss')
            };
            try{
                await db.collection('notes').insertOne(details, note)
            } catch (err) {
                console.log(err)
            }
            res.send(note)
        })

		.get( async (req, res) => {
				const id = req.params.id;
				const details = { '_id': ObjectId(id) };
				let result;
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

		.delete( async (req, res) => {
				const id = req.params.id;
				const details = { '_id': ObjectId(id) };
				let result;
				try{
					result = await db.collection('notes').remove(details)
				} catch (err) {
					console.log(err)
				}
				res.send('List ' + id + ' deleted!')
			});
};