from flask import Flask, render_template
import sqlite3

app = Flask(__name__)


@app.route("/")
def home():
    # holdings contains the player who owns each place
    # fetch both players and places from the database
    # zip them together to create holdings, a list of dictionaries
    # and pass holdings to the template
    connection = sqlite3.connect('stravarisk.sqlite')
    cursor = connection.cursor()
    
    places = [place[0] for place in cursor.execute("SELECT place FROM holdings").fetchall()]
    players = [player[0] for player in cursor.execute("SELECT player FROM holdings").fetchall()]
    count_armies = [army_count[0] for army_count in cursor.execute("SELECT count_armies FROM holdings").fetchall()]

    holdings = [{"place": place, "player": player, "army_count": army_count} for place, player, army_count in zip(places, players, count_armies)]

    return render_template("index.html", holdings=holdings)

if __name__ == "__main__":
    app.run(debug=True)
