run:
	open http://localhost:8000
	python3 -m http.server 8000

web:
	python3 -m http.server 8000 &
	ngrok http http://localhost:8000 &

kill:
	pkill -f 'http.server'
	pkill -f 'ngrok http'

open:
	open http://localhost:8000
