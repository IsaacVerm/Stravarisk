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
    # each color is a string in the format "rgb(r, g, b)"
    # where r, g, b are integers between 0 and 255
    # take a random value for r, g, b
    rgb_values = []
    for place in places:
        r = random.randint(0, 255)
        g = random.randint(0, 255)
        b = random.randint(0, 255)
        rgb_values.append(f"rgb({r}, {g}, {b})")

    places = [{"name": place, "color": rgb} for place, rgb in zip(places, rgb_values)]
    print(places)

    return render_template("index.html", places=places)


if __name__ == "__main__":
    app.run(debug=True)
