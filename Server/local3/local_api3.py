import logging
from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)


logging.basicConfig(filename='app.log', level=logging.DEBUG)


event_data = pd.read_csv('music_final.csv')

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to my Flask app!'

@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(event_data.to_dict(orient='records'))

@app.route('/events/<int:event_id>', methods=['GET'])
def get_event_by_id(event_id):
    event = event_data[event_data['id'] == event_id]
    if event.empty:
        return jsonify({"error": f"Event with ID {event_id} not found"}), 404
    else:
        return jsonify(event.to_dict(orient='records')[0])


@app.route('/favicon.ico')
def favicon():
    return '', 404

@app.route('/search', methods=['GET'])
def search_events():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter 'query' is required"}), 400

    logging.info("Search query: %s", query)

    lower_query = query.lower()


    artist_results = event_data[event_data['artist'].str.lower().str.contains(lower_query)]

    

    genre_results = event_data[event_data['genre'].str.lower().str.contains(lower_query)]

    
    filtered_results = pd.concat([artist_results, genre_results])

  
    if re.search(r"[fm]\s*?\ or\s*?genre", lower_query): 
        
        filtered_results = filtered_results.sort_values(by=lambda x: x['genre'].str.lower().str.contains(lower_query), ascending=True)

   
    filtered_results = filtered_results.drop_duplicates(subset=['artist'], keep='first')


    logging.info("Filtered events: %s", filtered_results.to_dict(orient='records'))

    
    return jsonify(filtered_results[['artist', 'genre', 'subgenre', 'home', 'date', 'time', 'venue']].to_dict(orient='records'))

@app.route('/bookmarked-events', methods=['GET'])
def get_bookmarked_events():
    bookmarked_events = event_data[event_data['bookmarked'] == True]
    return jsonify(bookmarked_events.to_dict(orient='records'))


@app.route('/update-bookmarks', methods=['PUT'])
def update_bookmarks():
    try:
        bookmarked_event_ids = request.json.get('bookmarkedEventIds', [])
        event_data.loc[event_data['id'].isin(bookmarked_event_ids), 'bookmarked'] = True
        event_data.loc[~event_data['id'].isin(bookmarked_event_ids), 'bookmarked'] = False
        event_data.to_csv('music_final.csv', index=False)
        return get_bookmarked_events()
    except Exception as e:
        return jsonify(error=str(e)), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)