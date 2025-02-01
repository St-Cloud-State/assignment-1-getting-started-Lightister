from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
Apps = ["John Doe"];




@app.route('/api/Apps', methods=['GET'])
def get_all_Apps_v2():
    return jsonify({'list of applicants':Apps})


# API to add a Apps to the database
@app.route('/api/add_Apps', methods=['POST'])
def add_Apps():
    print("adding applicant")
    data = request.get_json()
    title = data.get('title')
    Apps.append(title);
    return jsonify({'message': 'Apps added successfully'})
 
# Route to render the index.html page
@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
