from flask import Flask, render_template
import random

app = Flask(__name__)


@app.route("/")
def home():
    # places is a list of countries featuring in the Risk game
    places = [
        "Alaska",
        "Northwest Territory",
        "Greenland",
        "Alberta",
        "Ontario",
        "Quebec",
        "Western United States",
        "Eastern United States",
        "Central America",
        "Venezuela",
        "Peru",
        "Brazil",
        "Argentina",
        "Iceland",
        "Scandinavia",
        "Ukraine",
        "Great Britain",
        "Northern Europe",
        "Western Europe",
        "Southern Europe",
        "North Africa",
        "Egypt",
        "East Africa",
        "Congo",
        "South Africa",
        "Madagascar",
        "Ural",
        "Siberia",
        "Yakutsk",
        "Kamchatka",
        "Irkutsk",
        "Mongolia",
        "China",
        "Japan",
        "Afghanistan",
        "Middle East"
    ]

    # create a list of colors
    # this list is as long as the places list
    # there's a color for each player
    # since we have 5 players, we have 5 colors
    # the colors are either red, green, blue, yellow, or purple
    player_colors = ["red", "green", "blue", "yellow", "purple"]
    colors = random.choices(player_colors,
                            k=len(places))

    places = [{"name": place, "color": color} for place, color in zip(places, colors)]

    return render_template("index.html", places=places)

if __name__ == "__main__":
    app.run(debug=True)
