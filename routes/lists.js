const ObjectId = require('mongodb').ObjectId;
const moment = require('moment');

module.exports = (app, db) => {
    app.route('/lists') // <<<<<<<<<<<<<<<<<<<<<<<<< new route
    //// add new note
        .post( async  (req, res) => {
            const note = {
                title: req.body.title,
                content: req.body.body,
				// разобраться с генерированием id каждого пункта, checked / unchecked
                type: 'list',
                date: moment().format('DD.MM.YYYY at HH:mm:ss')
            };
            try{
                await db.collection('notes').insertOne(note)
            } catch (err) {
                console.log(err)
            }
            res.render('list');
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

        .put ( async (req, res) => {
            const id = req.params.id;
            const details = { '_id': ObjectId(id) };
            const note = {
                title: req.body.title,
                content: req.body.body,
                // разобраться с генерированием id каждого пункта, checked / unchecked
                type: 'list',
                date: moment().format('DD.MM.YYYY at HH:mm:ss')
            };
            try{
                await db.collection('notes').update(details, note)
            } catch (err) {
                console.log(err)
            }
            res.send(note)
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

	// писать здесь
};