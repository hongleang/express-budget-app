const express = require('express');

const router = express.Router();

// DB
const db = require('../db/db');
const { getAllItems, addTodatabase, getItemById, updateItem, deleteItem, transferMoney } = db;

router.get('/', (req, res, next) => {
    const envelopes = getAllItems();
    if (envelopes) {
        res.status(200).send(envelopes);
    } else {
        res.status(404).send("Envelopes not found!");
    }
});

router.post('/', (req, res, next) => {
    const newEnvelop = addTodatabase(req.body);
    if (newEnvelop) {
        res.status(201).send(newEnvelop);
    } else {
        res.status(400).send('Bad request');
    }
});

router.get('/:envelopeId', (req, res, next) => {
    const envelope = getItemById(req.params.envelopeId);
    if (envelope) {
        res.status(200).send(envelope);
    } else {
        res.status(404).send("Envelope not found!");
    }
});

router.put('/:envelopeId', (req, res, next) => {
    req.body.id = req.params.envelopeId;
    const envelope = updateItem(req.body);
    if (envelope) {
        res.status(200).send(envelope);
    } else {
        res.status(404).send("Envelope not found!");
    }
});

router.delete('/:envelopeId', (req, res, next) => {
    const deleted = deleteItem(req.params.envelopeId);
    if (deleted) {
        res.status(204).send("Envelope is successfully deleted!");
    } else {
        res.status(404).send("Envelope not found!");
    }
});

// Transfer money
router.post('/transfer/:from/:to', (req, res, next) => {
    const transactionEnvelopes = [req.params.from, req.params.to];
    const transaction = transferMoney(req.body, transactionEnvelopes);
    if (transaction) {
        res.status(201).send(transaction);
    } else {
        res.status(404).send('Envelope not found!');
    }
});

module.exports = router;