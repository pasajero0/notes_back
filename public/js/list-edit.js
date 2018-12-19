
const sendReq = async (e) => {
    const id = e.target.attributes['note-id'];
    let type;
    let routeId;
    if (id === undefined) {
        type = 'post';
        routeId = '';
        console.log('post');
    } else {
        type = 'put';
        routeId = id.value;
        console.log('put');
    }
    console.log(id);
    const data = {
        title: document.querySelector('.unfinished-tasks-list-title').value,
        body: JSON.parse(localStorage.getItem("todo"))
    };
    const rawResponse = await fetch(`/lists/${routeId}`, {
        method: type,
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
    })
        .catch(function (error) {
            console.log('Request failed', error);
        });
    const content = rawResponse.json();
    console.log(content);
    localStorage.removeItem("todo");
    window.location.href = "/";
};
document.querySelector('.send-btn').addEventListener('click', sendReq);


const deleteNote = async (e) => {
    const id = e.target.attributes['note-id'].value;
    await fetch(`/lists/${id}`, {
        method: 'delete'
    })
        .catch(function (error) {
            console.log('Request failed', error);
        });
    window.location.href = "/";
};
document.querySelector('.delete-btn').addEventListener('click', deleteNote);