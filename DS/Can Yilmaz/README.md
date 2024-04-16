###CONCERT RECOMMENDER

The general idea of the Concert Recommender is as follows: each time a user selects a concert, the app is able to suggest concerts likely to interest them. The recommendation is based solely on musical proximity to the chosen concert.

I preferred to opt for a content based recommendation system rather than a collaborative system, to be able to stay as close as possible to the artistic nature of the chosen concert, without involving the choices and tastes of others users (but also because it was easier to do in our project context)

To do this I first had to find datasets with some musical characteristics of the artists that we had in the datasets of our main app. Fortunately there are many Spotify datasets that contain these kinds of characteristics. Indeed Spotify provides several audio features for each song, features like “acousticness, danceability, energy, instrumentalness, loudness, tempo, valence etc…”. Using these features, it is possible to find correlations between songs and then to propose similar songs to a given one.

I found several Spotify datasets on kaggle, and assembled them in order to have enough similar artists to the main concert datasets we had for the project. 
The datasets I found were based on songs and not artists, but for the concert recommender I needed suggestions based on artists of course. So for each audio feature, I used the mean of the songs features in order to have some metrics associated with the artists of the datasets and not with the songs anymore. 
Then I used the K-nearest neighbors model for the recommendation model.

Unable to deploy it in the app, I built a simple Flask server with an html template, in order to use and test it. I would obviously have liked to take the idea further, but with everything that had to be done for the project, I unfortunately didn't have more time to devote to it.

