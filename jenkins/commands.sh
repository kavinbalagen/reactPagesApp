GIT_ACCESS_TOKEN=$1
TARGET_LANGUAGE_REPOSITORY=$2
TARGET_LANGUAGE_REPOSITORY_URL=$3

export GITHUB_TOKEN=$GIT_ACCESS_TOKEN

echo "DOWNLOADING DOCS"
curl https://github.com/kavinbala96/weatherapp/raw/main/docs.zip -L -O -J
#aws s3 cp "s3://inindca-api/sdkdocs/java/docs.zip" "."

echo "EXTRACTING DOCS"
# DOWNLOAD AND MOVING DOCS
mkdir docs
unzip docs.zip -d docs
rm -r -f docs.zip
rm -r -f reactApp/public/docs
mv -f docs reactApp/public/
python3 ./jenkins/generate_index.py $TARGET_LANGUAGE_REPOSITORY

echo "BUILDING APP"
# CLONING TARGET REPO & CREATING STAGING BRANCH
rm -r -f $TARGET_LANGUAGE_REPOSITORY
git clone $TARGET_LANGUAGE_REPOSITORY_URL
cd $TARGET_LANGUAGE_REPOSITORY
git switch --orphan react-app-staging
cd ..
cp -r reactApp/* $TARGET_LANGUAGE_REPOSITORY/

echo "DEPLOYING APP"
# BUILD & DEPLOYING APP
cd $TARGET_LANGUAGE_REPOSITORY
npm install
npm i -g tsx
npm run deploy
