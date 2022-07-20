const showAllEnvelopesBtn = document.getElementById('show-all-envelopes');
const spinner = document.getElementById('spinner');

const envelopesSection = document.getElementById('envelopes');

const renderEnvelopes = (envelopes) => {
    const divRow = document.createElement('div');
    divRow.classList.add('row');

    envelopes.forEach(envelope => {
        const divCol = document.createElement('div');
        divCol.classList.add('col-sm-4');

        const card = document.createElement('div');
        card.classList.add('card');
        divCol.appendChild(card);

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header', 'd-flex', 'justify-content-between', 'align-items-center');
        card.appendChild(cardHeader);

        const categotyName = document.createElement('span');
        categotyName.classList.add('fs-5');
        categotyName.innerHTML = envelope.name;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('d-flex', 'align-items-center');

        const detailBtn = document.createElement('a');
        detailBtn.classList.add('btn', 'btn-sm', 'btn-dark', 'me-2');
        detailBtn.href = './edit-envelope.html';
        detailBtn.innerHTML = 'Edit';
        detailBtn.addEventListener('click', function () {
            localStorage.setItem('envelopeId', envelope.id);
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.addEventListener('click', function () {
            fetch('/envelopes/' + envelope.id, {
                method: 'DELETE'
            })
                .then(() => {
                    window.location.reload();
                    fetchAllEnvelopes();
                })
                .catch(err => {
                    console.error(err.message);
                })
        });

        cardHeader.appendChild(categotyName);
        buttonGroup.appendChild(detailBtn);
        buttonGroup.appendChild(deleteBtn);
        cardHeader.appendChild(buttonGroup);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        const paragraph = document.createElement('p');
        paragraph.classList.add('lead', 'fs-4');
        paragraph.innerHTML = envelope.description;

        const text = document.createElement('span');
        text.classList.add('text-secondary', 'fs-6', 'mb-3');
        text.innerHTML = 'Total Budget: ';

        const amountOfMoney = document.createElement('span');
        amountOfMoney.classList.add('fs-2', 'text-dark', 'fw-bold');
        amountOfMoney.innerHTML = envelope.amountOfMoney;

        cardBody.appendChild(paragraph);
        cardBody.appendChild(text);
        cardBody.appendChild(amountOfMoney);

        divRow.appendChild(divCol) // Append everything to divRow
    })

    envelopesSection.insertAdjacentElement('beforeend', divRow);

}

const fetchAllEnvelopes = async () => {
    try {
        showAllEnvelopesBtn.disabled = true;
        spinner.classList.remove('d-none');
        spinner.classList.add('d-inline-block');
        const envelopes = await fetch('/envelopes');
        const response = await envelopes.json();
        if (response) {
            setTimeout(() => {
                spinner.classList.remove('d-block');
                spinner.classList.add('d-none');

                renderEnvelopes(response);
            }, 1000)
        }
        return null;
    } catch (error) {
        console.error(error.message);
    }
};


showAllEnvelopesBtn.addEventListener('click', fetchAllEnvelopes);


