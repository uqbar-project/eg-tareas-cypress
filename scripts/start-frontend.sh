if [ ! -d eg-tareas-angular ] ; then
  git clone https://github.com/uqbar-project/eg-tareas-angular
fi
cd eg-tareas-angular
git pull
npm install
nohup npm start > output-frontend.log 2>&1 &