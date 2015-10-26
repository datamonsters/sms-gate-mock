# SMS Server Mock

## Api

### POST /sms/send

- Params:
	- phone
	- text

- Results:
	- Correct:
Status code: `200`
Text: `ok`

	- Incorrect request (no `phone` parameter)
Status code: `400`
Text: `Argument doesn't exist: phone`

	- Incorrect request (no `text` parameter)
Status code: `400`
Text: `Argument doesn't exist: text`

### GET /sms/isAskedToSendSms

- Params: 
	- phone

- Results:
	- Correct:

	Status code: `200`
	Text: 
	```json
	{
		"text": "sms text",
		"time": "timestamp"
	}
	```

	- Incorrect request (no `phone` parameter)
	Status code: `400`
	Text: 
	```json
	{
		"error": "phone doesn't asked"
	}
	```

## Production

Run

```bash
PORT=8090 node bin/www
```

## Development

```bash
cd path/to/project
npm install 
```

## Tests

```bash
sudo npm install -g mocha
mocha
```
