import os
import json
import sys
import fileinput

APP_NAME_LIST=['package.json','package-lock.json','src/constants.ts']

def generate_index(path_to_directory):
    file_names=[]
    for file in os.listdir(path_to_directory):
        file_path = os.path.join(path_to_directory,file)
        if os.path.isfile(file_path):
            file_names.append(file)
    file_names.sort()
    return {"names":file_names}

def saving_index_file():
    with open('public/names.json','w+') as file:
        file_names=generate_index('public/docs')
        json.dump(file_names,file,indent=4)

def renaming_app():
    for filename in ['package.json','package-lock.json','src/constants.ts']:
        with fileinput.FileInput(filename, inplace=True) as file:
            for line in file:
                print(line.replace("{{APP_NAME}}", "java-test-repository"), end='')

if __name__ == '__main__':
    saving_index_file()
    renaming_app()
    ### TO BE COMMENTED OUT ###
    print("PYSCRIPT "+sys.argv[1])