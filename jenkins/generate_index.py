import os
import json
import sys
import fileinput

APP_NAME_LIST=['reactApp/package.json','reactApp/package-lock.json','reactApp/src/components/Constants.tsx']
DOCS_DIR = 'reactApp/public/docs'
NAMES_DIR = 'reactApp/public/names.json'

def process_files():
    file_names=[]
    # removing files other than .md
    for file in os.listdir(DOCS_DIR):
        file_path = os.path.join(DOCS_DIR,file)
        if os.path.isfile(file_path) and file.endswith('.md'):
            file_names.append(file[:-3]+'.json')
        else:
            os.remove(file_path)
    # renaming to .json, thank github :(
    for file in os.listdir(DOCS_DIR):
        file_path = os.path.join(DOCS_DIR,file)
        os.replace(file_path,file_path[:-3]+'.json')
    file_names.sort()
    return {"names":file_names}

def saving_index_file():
    with open(NAMES_DIR,'w+') as file:
        file_names=process_files()
        json.dump(file_names,file,indent=4)

def renaming_app():
    for filename in APP_NAME_LIST:
        with fileinput.FileInput(filename, inplace=True) as file:
            for line in file:
                print(line.replace("{{APP_NAME}}", sys.argv[1]), end='')


if __name__ == '__main__':
    saving_index_file()
    renaming_app()
    ### TO BE COMMENTED OUT ###

    print("PYSCRIPT "+sys.argv[1])