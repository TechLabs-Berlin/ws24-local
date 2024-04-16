from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

app = Flask(__name__)

df = pd.read_csv('final_files.csv')
artist_features = df.groupby('artists').agg({
    'danceability': 'mean',
    'energy': 'mean',
    'loudness': 'mean',
    'acousticness': 'mean',
    'instrumentalness': 'mean',
    'liveness': 'mean',
    'valence': 'mean',
    'tempo': 'mean'
}).reset_index()

scaler = StandardScaler()
artist_features_scaled = scaler.fit_transform(artist_features.iloc[:, 1:])
knn_model = NearestNeighbors(n_neighbors=5, metric='cosine')
knn_model.fit(artist_features_scaled)

def recommend_similar_artists(artist_name):
    artist_index = artist_features[artist_features['artists'] == artist_name].index[0]
    artist_features_scaled = scaler.transform(artist_features.iloc[artist_index, 1:].values.reshape(1, -1))
    distances, indices = knn_model.kneighbors(artist_features_scaled)
    recommended_artists = artist_features.iloc[indices[0], 0].tolist()
    recommended_artists.remove(artist_name)
    return recommended_artists

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    artist_name = request.form['artist_name']
    recommended_artists = recommend_similar_artists(artist_name)
    return jsonify({'recommended_artists': recommended_artists})

if __name__ == '__main__':
    app.run(debug=True)
