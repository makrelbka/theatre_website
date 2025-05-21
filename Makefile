run:
	open http://localhost:8000
	python3 -m http.server 8000

web:
	rm -f pids.txt
	python3 -m http.server 8000 & echo $$! >> pids.txt
	ngrok http http://localhost:8000 & echo $$! >> pids.txt


stop:
	if [ -f pids.txt ]; then \
		while read pid; do \
			kill $$pid; \
		done < pids.txt; \
		rm pids.txt; \
		echo "Процессы остановлены"; \
	else \
		echo "Файл pids.txt не найден"; \
	fi

open:
	open http://localhost:8000
