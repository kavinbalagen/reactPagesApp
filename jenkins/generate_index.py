import os
import json
import sys

def generate_index(path_to_directory):
    file_names=[]
    for file in os.listdir(path_to_directory):
        file_path = os.path.join(path_to_directory,file)
        if os.path.isfile(file_path):
            file_names.append(file)
    file_names.sort()
    return {"names":file_names}

print("BUILDING "+sys.argv[1])


with open('names.json','w+') as file:
    file_names=generate_index('public/docs')
    json.dump(file_names,file,indent=4)

with open('names.json','w+') as file:
    pass