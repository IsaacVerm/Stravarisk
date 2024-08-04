# table called rides
# columns: player, timestamp, distance
# player is either Johannes, Jonas, Jeroen, Nicolas or Isaac
# example timestamp 2018-05-02T12:15:09Z (format used in response Strava API /athlete/activities)
# examples distance: 24349.5, 12345.6, 9876.5 (in meters)
# use sqlite to create a table and insert some data

import sqlite3, random

# create a connection to a database
connection = sqlite3.connect('stravarisk.sqlite')

# create a cursor object
cursor = connection.cursor()

# delete table rides if it exists
cursor.execute("DROP TABLE IF EXISTS rides")

# create a table
# timestamp in ISO-8601 format: "YYYY-MM-DD HH:MM:SS"
cursor.execute('''CREATE TABLE rides
                (player text, timestamp text, distance real)''')

# config data
recent_date = "2024-07-27 12:15:09"
old_date = "2018-01-01 12:15:09"
players = ["Johannes", "Jonas", "Jeroen", "Nicolas", "Isaac"]

# loop over players
# insert 6 rows for each player
# 3 rows with recent date and 3 rows with old date
# the distance is a random number between 20000 and 200000
for player in players:
    for i in range(1, 4):
        cursor.execute("INSERT INTO rides VALUES (?, ?, ?)", (player, recent_date, random.randint(20000, 200000)))
    for i in range(1, 4):
        cursor.execute("INSERT INTO rides VALUES (?, ?, ?)", (player, old_date, random.randint(20000, 200000)))
        
# commit the changes
connection.commit()

# close the connection
connection.close()