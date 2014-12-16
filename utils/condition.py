import csv
import json

all_entries = []
with open('GSoC2013.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in spamreader:
        tags = [r.strip().lower() for r in row[2].split(',')]
        all_entries.append(
            {
                "gt": row[0],
                "name": row[1],
                "tags": tags,
                "link": row[3]
            }
        )

json.dump(all_entries, open("gsoc13.json", "w"))

print "No. of entries written:", len(all_entries)