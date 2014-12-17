import csv
import json

from sys import argv

all_entries = []
with open(argv[1], 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    first = True
    for row in spamreader:
        if first:
            first = False
            continue
        tags = [r.strip().lower() for r in row[2].split(',')]
        all_entries.append(
            {
                "gt": row[0],
                "name": row[1],
                "tags": tags,
                "link": row[3]
            }
        )

json.dump(all_entries, open(argv[1].split('.')[0]+".json", "w"))

print "No. of entries written:", len(all_entries)