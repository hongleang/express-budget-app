const fromSelection = document.getElementById('fromSelection');
const toSelection = document.getElementById('toSelection');
const amount = document.getElementById('amount');

const transferForm = document.getElementById('transferForm');

const renderInput = (response) => {
    response.forEach(res => {
        const fromOption = document.createElement('option');
        fromOption.value = res.id;
        fromOption.innerHTML = res.name;

        const toOption = document.createElement('option');
        toOption.value = res.id;
        toOption.innerHTML = res.name;

        fromSelection.add(fromOption);
        toSelection.add(toOption);
    });

}


const fetchSelections = async () => {
    try {
        const envelopes = await fetch(`/envelopes`);
        const response = await envelopes.json();
        if (response) {
            renderInput(response);
        }
    } catch (err) {
        console.error(err.message);
    }
}

fetchSelections();

transferForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default behaviour

    fetch(`envelopes/transfer/${fromSelection.value}/${toSelection.value}`, {
        method: 'POST',
        body: JSON.stringify({
            transferMoney: amount.value,
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => {
            window.location.replace('./index.html');
        })
        .catch(err => console.error(err.message));

})