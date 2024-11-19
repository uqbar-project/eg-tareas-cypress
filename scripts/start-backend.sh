if [ ! -d eg-tareas-springboot-kotlin ] ; then
  git clone https://github.com/uqbar-project/eg-tareas-springboot-kotlin
fi
cd eg-tareas-springboot-kotlin
git pull
nohup ./gradlew bootRun > output.log 2>&1 &