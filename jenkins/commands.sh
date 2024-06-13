GIT_ACCESS_TOKEN=$1


echo "GIT_ACCESS_TOKEN = $GIT_ACCESS_TOKEN"

echo "DOWNLOADING DOCS"
#curl https://github.com/kavinbala96/weatherapp/raw/main/docs.zip -L -O -J


echo "EXTRACTING DOCS"
pwd
mkdir docs
unzip docs.zip -d docs
rm -r -f public/docs
mv -f docs public/

