# Порты
front_PORT = 8081
back_PORT = 5000

# ---------------------------
# Запуск фронтенда
start-front:
	@echo "Запуск фронтенда на порту $(front_PORT)..."
	@python3 -m http.server $(front_PORT) --directory front &
	@sleep 1
	@echo "Фронтенд запущен: http://localhost:$(front_PORT)/"

# Остановка фронтенда
stop-front:
	@echo "Остановка фронтенда..."
	@fport=$$(lsof -ti tcp:$(front_PORT)); \
	if [ -n "$$fport" ]; then \
	    kill -9 $$fport; \
	    echo "Фронтенд остановлен (PID $$fport)"; \
	else \
	    echo "Фронтенд не найден"; \
	fi


# ---------------------------
# Запуск бэкенда
start-back:
	@echo "Запуск сервера back на порту $(back_PORT)..."
	@cd back && FLASK_APP=payment.py flask run --port=$(back_PORT) &
	@sleep 2
	@echo "back запущен: http://localhost:$(back_PORT)/"

# Остановка бэкенда
stop-back:
	@echo "Остановка back..."
	@bport=$$(lsof -ti tcp:$(back_PORT)); \
	if [ -n "$$bport" ]; then \
	    kill -9 $$bport; \
	    echo "back остановлен (PID $$bport)"; \
	else \
	    echo "back не найден"; \
	fi


# ---------------------------
# Общие команды
start-all: start-back start-front
	@echo "Открываем фронтенд в браузере..."
	@echo http://localhost:$(front_PORT)

stop-all: stop-front stop-back
	@echo "Все процессы остановлены."

status:
	@echo "Процессы http.server:"
	@pgrep -fl "python3 -m http.server" || echo "Не запущен"
	@echo "Процессы back (flask):"
	@pgrep -fl "flask run" || echo "Не запущен"

clean:
	@echo "Очистка временных файлов..."
	@find . -name ".DS_Store" -type f -delete 

msg ?= "default commit"

git:
	@git status
	@git add .
	@git commit -m "$(msg)"
	@git push

