from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

@app.route("/api/holdings", methods=["GET"])
def get_holdings():
    # connect to the database
    connection = sqlite3.connect('stravarisk.sqlite')
    cursor = connection.cursor()
    
    # fetch data from the database
    places = [place[0] for place in cursor.execute("SELECT place FROM holdings").fetchall()]
    players = [player[0] for player in cursor.execute("SELECT player FROM holdings").fetchall()]
    count_armies = [army_count[0] for army_count in cursor.execute("SELECT count_armies FROM holdings").fetchall()]

    # create holdings list
    holdings = [{"place": place, "player": player, "army_count": army_count} for place, player, army_count in zip(places, players, count_armies)]

    # close the database connection
    connection.close()

    # return holdings as JSON
    return jsonify(holdings)

@app.route("/api/reinforcements", methods=["GET"])
def get_reinforcements():
    # connect to the database
    connection = sqlite3.connect('stravarisk.sqlite')
    cursor = connection.cursor()
    
    # fetch rides from the database
    rides = [{"player": player, "timestamp": timestamp, "distance": distance} for player, timestamp, distance in cursor.execute("SELECT player, timestamp, distance FROM rides").fetchall()]
    
    # calculate reinforcements
    # for each 50000 meters, a player gets 1 reinforcement
    # no partial reinforcements are given
    reinforcements = {}
    for ride in rides:
        player = ride["player"]
        distance = ride["distance"]
        if player not in reinforcements:
            reinforcements[player] = 0
        reinforcements[player] += int(distance / 50000) # int rounds down
        
    # close the database connection
    connection.close()
    
    # return reinforcements as JSON
    return jsonify(reinforcements)
    
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
