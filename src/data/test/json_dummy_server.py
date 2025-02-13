from flask import Flask, jsonify
import json
import time
import random
from flask_sock import Sock

json_path = "./DUMMY_DATA.json"
json_file = open(json_path)
loaded_json = json.load(json_file)

app = Flask(__name__)

sock = Sock(app)

def create_app():
    app = Flask(__name__)
    sock.init_app(app)


def get_json():
    new_timestamp = int(time.time() * 1000)  # Use milliseconds
    for sensor_type in loaded_json["data"]:
        for sensor in loaded_json["data"][sensor_type]:
            if "sensorReading" in loaded_json["data"][sensor_type][sensor]:
                loaded_json["data"][sensor_type][sensor]["sensorReading"] = round(random.uniform(-10.0, 500.0), 2)  # Add random variance
            loaded_json["data"][sensor_type][sensor]["timeStamp"] = new_timestamp

    loaded_json["timeStamp"] = new_timestamp
    updated_json = json.dumps(loaded_json)
    return updated_json
    
@sock.route('/ws')
def ecs_static_json(ws):
    print(ws)
    while True:
        time.sleep(1) #rate limit api output
        #print('progres')
        #data = ws.receive()
        #ws.send(jsonify(get_json()))
        ws.send(get_json())

@sock.route('/')
def get_request(ws):
    print(ws)
    while True:
        time.sleep(1) #rate limit api output
        #print('progres')
        #data = ws.receive()
        #ws.send(jsonify(get_json()))
        ws.send(get_json())

"""
@app.route('/')
def index():
    return "More to come, for now you can use the /ecs_sim endpoint."
    
@app.route('/ecs_sim')
def ecs_sim():
    json = get_json()
    return jsonify(json)
    #return "More to come, for now you can use the /ecs_sim endpoint."
"""

if __name__ == "__main__":
    #print(get_json())
    create_app()
    app.run(host="localhost", port=9002, debug=True)
