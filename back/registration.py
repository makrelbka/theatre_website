from flask import Flask, request, jsonify
from flask_cors import CORS 
import json
from datetime import datetime
from pathlib import Path

app = Flask(__name__)
CORS(app)

TICKETS_FILE = Path(__file__).parent / "tickets.json"
BOOKINGS_FILE = Path(__file__).parent / "visiters.json"


def load_json(file_path, default):
    if file_path.exists():
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return default

def save_json(file_path, data):
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route("/api/tickets", methods=["GET"])
def get_tickets():
    tickets = load_json(TICKETS_FILE, {})
    return jsonify(tickets)

@app.route("/api/buy", methods=["POST"])
def buy_ticket():
    data = request.json
    event_id = data.get("eventId")
    fio = data.get("fio")
    phone = data.get("phone")

    if not event_id or not fio or not phone:
        return jsonify({"error": "Некорректные данные"}), 400

    tickets = load_json(TICKETS_FILE, {})
    if tickets.get(event_id, 0) <= 0:
        return jsonify({"error": "Билеты закончились"}), 400

    # уменьшаем билет
    tickets[event_id] -= 1
    save_json(TICKETS_FILE, tickets)

    # добавляем запись
    bookings = load_json(BOOKINGS_FILE, [])
    bookings.append({
        "eventId": event_id,
        "fio": fio,
        "phone": phone,
        "date": datetime.now().isoformat()
    })
    save_json(BOOKINGS_FILE, bookings)

    return jsonify({"success": True, "ticketsLeft": tickets[event_id]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
