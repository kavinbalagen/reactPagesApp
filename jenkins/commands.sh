GIT_ACCESS_TOKEN=$1
TARGET_LANGUAGE_REPOSITORY=$2

echo "GIT_ACCESS_TOKEN = $GIT_ACCESS_TOKEN"

echo "DOWNLOADING DOCS"
curl https://github.com/kavinbala96/weatherapp/raw/main/docs.zip -L -O -J
#aws s3 cp "s3://inindca-api/sdkdocs/java/docs.zip" "."

echo "EXTRACTING DOCS"
pwd
mkdir docs
unzip docs.zip -d docs
rm -r -f docs.zip
rm -r -f public/docs
mv -f docs public/
python3 ./jenkins/generate_index.py $TARGET_LANGUAGE_REPOSITORY

