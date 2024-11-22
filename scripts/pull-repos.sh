if [ ! -d eg-tareas-springboot-kotlin ] ; then
  git clone https://github.com/uqbar-project/eg-tareas-springboot-kotlin
fi
cd eg-tareas-springboot-kotlin
git pull

if [ ! -d eg-tareas-angular ] ; then
  git clone https://github.com/uqbar-project/eg-tareas-angular
fi
cd eg-tareas-angular
git pull
# npm install

if ![ -z ${CI} ] ; then
  find ../cypress/e2e -name '*.ts' -exec sed -i 's/localhost/host.docker.internal/g' {} +
  find ../eg-tareas-angular/src -name '*.ts' -exec sed -i 's/localhost/host.docker.internal/g' {} +
fi