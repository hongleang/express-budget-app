const nameInput = document.getElementById('name');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

const editForm = document.getElementById('editForm');

const renderInput = (response) => {
    nameInput.value = response.name;
    description.value = response.description;
    amount.value = response.amountOfMoney;
}

const fetchAnEnvelope = async () => {
    try {
        const envelope = await fetch(`/envelopes/${localStorage.getItem('envelopeId') ?? -1}`)
        const response = await envelope.json();
        if (response) {
            renderInput(response);
        }
    } catch (err) {
        console.error(err.message);
    }
}

fetchAnEnvelope();

editForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default behaviour

    fetch(`/envelopes/${localStorage.getItem('envelopeId')}`, {
        method: 'PUT',
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
        .then(() => {
            localStorage.clear();
            window.location.replace('./index.html');
        })
        .catch(err => console.error(err.message));

})