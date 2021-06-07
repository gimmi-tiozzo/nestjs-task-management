#esegui immagine postgres
docker run --name pg -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d --rm postgres
#esegui pgadmin
docker run --name pga -p 4000:80 -e PGADMIN_DEFAULT_PASSWORD=postgres -e PGADMIN_DEFAULT_EMAIL=test.test@test.com -d --rm dpage/pgadmin4