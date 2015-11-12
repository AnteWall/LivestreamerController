from flask import Flask, jsonify, request
from flask import render_template
from livestream_process import *
app = Flask(__name__,static_url_path='/static')

LIVESTREAM_PROCESS = None

""" GET Home page """
@app.route("/")
def index():
	return render_template('index.html')

""" POST Create new Process """
@app.route('/process/new',methods=['POST'])
def new_process():
	LIVESTREAM_PROCESS.start_process(request.form['stream'],
		request.form['port'],
		request.form['arguments'])	
	return jsonify(success=True)

""" GET Active Process """
@app.route('/process')
def process():
	return jsonify(LIVESTREAM_PROCESS.get_process_info())
if __name__ == "__main__":
	LIVESTREAM_PROCESS = LivestreamProcess()
	app.run(debug=True)