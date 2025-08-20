start:
	@python3 -m http.server 8081
	@echo "Started on 8081"
	@echo  http://localhost:8081/

stop:
	@pkill -f "python3 -m http.server 8081"

open:
	open http://localhost:8081

status:
	pgrep -fl http.server

git:
	@git status
	@git add .
	@git commit -m "default commit"
	@git push 
	@git status
