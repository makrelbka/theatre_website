back_PORT = 8081

start:
	@echo "Запуск сервера Flask (фронт+бэк) на порту $(back_PORT)..."
	@cd back && FLASK_APP=registration.py flask run --host=0.0.0.0 --port=$(back_PORT) >> ../site.log 2>&1 &
	@sleep 2
	@echo "Сервер запущен: http://localhost:$(back_PORT)/"

stop:
	@echo "Остановка сервера..."
	@bport=$$(lsof -ti tcp:$(back_PORT)); \
	if [ -n "$$bport" ]; then \
	    kill -9 $$bport; \
	    echo "Сервер остановлен (PID $$bport)"; \
	else \
	    echo "Сервер не найден"; \
	fi
	@echo "Все процессы остановлены."

restart: stop start

status:
	@echo "Проверка сервера на порту $(back_PORT)..."
	@bport=$$(lsof -ti tcp:$(back_PORT)); \
	if [ -n "$$bport" ]; then \
	    echo "Сервер работает (PID $$bport, порт $(back_PORT))"; \
	else \
	    echo "Сервер не запущен (порт $(back_PORT) свободен)"; \
	fi

clean:
	@echo "Очистка временных файлов..."
	@find . -name ".DS_Store" -type f -delete 

msg ?= "default commit"

git: clean
	@git status
	@git add .
	@git commit -m "$(msg)"
	@git push
