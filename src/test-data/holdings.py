# table called holdings
# columns: player, place, count_armies
# use sqlite to create a table and insert some data

import sqlite3, random

# create a connection to a database
connection = sqlite3.connect('stravarisk.sqlite')

# create a cursor object
cursor = connection.cursor()

# delete table rides if it exists
cursor.execute("DROP TABLE IF EXISTS holdings")

# create a table
cursor.execute('''CREATE TABLE holdings
                (place text, player text, count_armies integer)''')

# config data
players = ["Johannes", "Jonas", "Jeroen", "Nicolas", "Isaac"]
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

# loop over all the places
# insert the place in the place column
# randomly assign a player
# randomly assign a number of armies between 1 and 5
for place in places:
    player = random.choice(players)
    count_armies = random.randint(1, 5)
    cursor.execute("INSERT INTO holdings VALUES (?, ?, ?)", (place, player, count_armies))
        
# commit the changes
connection.commit()

# close the connection
connection.close()