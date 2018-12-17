
const sendReq = async (e) => {
  const id = e.target.attributes['note-id'].value;
	const data = {
		title: document.querySelector('.todo-note-title').value,
		body: document.querySelector('.todo-note-text').value
	};
	const rawResponse = await fetch(`/notes/${id}`, {  
	  method: 'put',
	  headers:{'content-type': 'application/json'},
	  body: JSON.stringify(data)  
	})
	.catch(function (error) {  
		console.log('Request failed', error);  
	});
	const content = await rawResponse.json();
	console.log(content);
	window.location.href = "/";
}
document.querySelector('.send-btn').addEventListener('click', sendReq);


const deleteNote = async (e) => {
	const id = e.target.attributes['note-id'].value;
	await fetch(`/notes/${id}`, {  
	  method: 'delete'  
	})
	.catch(function (error) {  
		console.log('Request failed', error);  
	});
	window.location.href = "/";
}
document.querySelector('.delete-btn').addEventListener('click', deleteNote);