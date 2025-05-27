run:
	open http://localhost:8000
	python3 -m http.server 8000

web:
	nohup python3 -m http.server 8000 > server.log 2>&1 &
	nohup ssh -R 80:localhost:8000 serveo.net > serveo.log 2>&1 &


kill:
	pkill -f 'http.server'
	pkill -f 'serveo.net'

open:
	open http://localhost:8000

status:
	pgrep -fl http.server
	pgrep -fl serveo.net

git:
	git add .
	git commit -m "base push"
	git push