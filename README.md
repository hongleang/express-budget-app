# Personal budget envelop

## GET all envelopes

Get all the available envelopes from the file :
http://localhost:3000/envelopes

 
## POST add envelop

Create a new envelope base on the given body:
http://localhost:3000/envelopes


## GET get an envelop

Get a single envelope based on the given id: 
http://localhost:3000/envelopes/1

## PUT edit envelop

Update an envelope based on the given id: 
http://localhost:3000/envelopes/1

## DEL delete envelope

Delete an envelope based on the given id:
http://localhost:3000/envelopes/1


## POST transfer money

Transfer amount of money from one envelope to the another: 
http://localhost:3000/envelopes/transfer/:fromEnvelopeId/:toEnvelopeId