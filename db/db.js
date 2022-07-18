const ENVELOPES = [
    {
        id: "1",
        name: 'Cars',
        description: 'For household cars',
        amountOfMoney: 500
    },
    {
        id: "2",
        name: 'Dinner',
        description: 'For special moment with love one',
        amountOfMoney: 100
    }
];

const getAllItems = () => {
    return ENVELOPES;
}

const addTodatabase = (newItem) => {
    if (!newItem.hasOwnProperty('name')) return null;
    const templateObject = {
        id: (ENVELOPES.length + 1).toString(),
        name: '',
        description: '',
        amountOfMoney: 0
    }
    const newObject = Object.assign({}, templateObject, newItem);

    ENVELOPES.push(newObject);
    return newObject
};

const getItemById = (envelopeId) => {
    const envelope = ENVELOPES.find(envelope => envelope.id === envelopeId);
    return envelope ? envelope : null;
};

const updateItem = (newInstance) => {
    const envelopeIndex = ENVELOPES.findIndex(envelope => envelope.id === newInstance.id);
    if (envelopeIndex < 0) return null;

    const updatedEnvelop = Object.assign({}, ENVELOPES[envelopeIndex], newInstance);
    ENVELOPES[envelopeIndex] = updatedEnvelop;
    return updatedEnvelop;
};

const deleteItem = (envelopeId) => {
    const envelopeIndex = ENVELOPES.findIndex(envelope => envelope.id === envelopeId);
    if (envelopeIndex >= 0) {
        ENVELOPES.splice(envelopeIndex, 1);
        return true;
    }

    return false;
};

const transferMoney = (value, transactionEnvelope) => {
    const fromEnvelope = ENVELOPES.findIndex(envelope => envelope.id === transactionEnvelope[0]);
    const toEnvelope = ENVELOPES.findIndex(envelope => envelope.id === transactionEnvelope[1]);

    if (fromEnvelope < 0 || toEnvelope < 0) return null;

    ENVELOPES[fromEnvelope].amountOfMoney -= value.transferMoney;
    ENVELOPES[toEnvelope].amountOfMoney += value.transferMoney;

    if (ENVELOPES[fromEnvelope].amountOfMoney < 0) {
        return {
            message: 'Insufficient fund to transfer!'
        }
    } else {
        return {
            "from": ENVELOPES[fromEnvelope],
            "to": ENVELOPES[toEnvelope]
        }
    }
}

module.exports = {
    getAllItems,
    addTodatabase,
    getItemById,
    updateItem,
    deleteItem,
    transferMoney
}