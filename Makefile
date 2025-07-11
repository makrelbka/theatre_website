run:
	@python3 -m http.server 8081
	@echo "Started on 8081"

kill:
	@pkill -f "python3 -m http.server 8081"

open:
	open http://localhost:8000

status:
	pgrep -fl http.server

git:
	@git status
	@git add .
	@git commit -m "default commit"
	@git push 
	@git status
