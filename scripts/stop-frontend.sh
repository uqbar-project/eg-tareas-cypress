# kill -9 $(ps aux | grep eg-tareas-angular | awk 'NR==1{print $2}')
kill -9 $(ps aux | grep angular-http-server | awk 'NR==1{print $2}')