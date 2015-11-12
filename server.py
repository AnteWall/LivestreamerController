from flask import Flask, jsonify, request
from flask import render_template
from flask.ext.cors import CORS
from livestream_process import *
app = Flask(__name__,static_url_path='/static')

CORS(app)
LIVESTREAM_PROCESS = None

""" GET Home page """
@app.route("/")
def index():
    return render_template('index.html')

""" POST Create new Process """
@app.route('/process/new',methods=['POST'])
def new_process():
    args = request.get_json()
    LIVESTREAM_PROCESS.start_process(args['stream'],
            args['port'],
            args['arguments'])	
    return jsonify(success=True)

""" DELETE Kill current process """
@app.route('/process/kill', methods=['DELETE'])
def kill_process():
    LIVESTREAM_PROCESS.stop_process()
    return jsonify(success=True)

""" GET Active Process """
@app.route('/process')
def process():
    return jsonify(LIVESTREAM_PROCESS.get_process_info())
if __name__ == "__main__":
    LIVESTREAM_PROCESS = LivestreamProcess()
    app.run(host='0.0.0.0', debug=True)
