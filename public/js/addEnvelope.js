const nameInput = document.getElementById('name');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

const addForm = document.getElementById('addForm');

addForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default behaviour

    fetch(`/envelopes`, {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            description: description.value,
            amountOfMoney: amount.value
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => {
            localStorage.clear();
            window.location.replace('./index.html');
        })
        .catch(err => console.error(err.message));

})