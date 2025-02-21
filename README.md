# Test backend NodeJS

Questo è un POC del progetto dato come test backend NodeJS. 

Per rendere più personale il progetto stesso, ho declinato l'applicazione `A` e l'applicazione `B` in due personaggi dei Simpson. 

L'applicazione `A` è `Lisa`, con un database di homework, mentre l'applicazione `B` è `Bart` che "vuole rubare" (Get e GetList) e "manomettere"(Post, Put e Delete) i compiti di `Lisa`.

Ho aggiunto un'entità `StolenHomework` dove salvo i risultati della `Get` e `GetList`.

Ho utilizzato Docker, Express come framework NodeJS, TypeScript, Prisma come ORM e PostgreSQL come database.

## Run progetto
Per far partire il progetto eseguire i seguenti comandi:

```bash
docker-compose up --build -d
docker-compose exec lisa npx prisma migrate dev --name init
docker-compose exec lisa npx prisma db seed
docker-compose exec bart npx prisma migrate dev --name init

```

## Test progetto

### Postman
Nella cartella `postman` nella root del progetto c'è l'export della collection delle chiamate API per Postman (sia nella versione 2.0 che 2.1).

Importando la collection si avranno due cartelle `Lisa` e `Bart`. 
#### Lisa 
In questa cartella ci sono le API che ho usato per sviluppare, non sono prettamente richieste dal testo dell'esercizio. Sono chiamate dirette all'app `Lisa`.

#### Bart
Nella cartella `Bart` ci sono le varie chiamate API richieste dal test dell'esercizio:

- `[Bart] Status Check`: chiamata API di controllo per lo stato di `Bart`
- `[Bart] Status Check Lisa`: chiamata API che tramite `Bart` controlla lo stato di `Lisa`
- `[Bart] Get stolen homeworks`: restituisce la lista di `homework` letti su `Lisa`
- `[Bart] Get List homework`: restituisce la lista di `homework` presenti su `Lisa` e persiste il risultato con un nuovo `stolenHomework`
- `[Bart] Get Single homework`: restituisce un singolo `homework` di `Lisa`
- `[Bart] Login`: permette di fare login in `Lisa`. È necessario mandare nel body `email` e `password`.
- `[Bart] Post homework`: permette di creare un nuovo `homework` su `Lisa`.
- `[Bart] Put homework`: permette di modificare un `homework` su `Lisa`
- `[Bart] Delete homework`: permette di cancellare un `homework` su `Lisa`


La collection è configurata il più possibile:
- se la login va a buon fine verrà salvato in una variabile d'ambiente il token ottenuto
- nelle chiamate API che necessitano di token (POST, PUT e DELETE), il token viene preso dalla variabile d'ambiente e settato nell'header.
- dove sono necessari payload o parametri sono già settati. Gli ID degli homework sono solo a scopo esemplificativo e vanno sostituiti con valori veritieri.
- gli endpoint di `Lisa` e `Bart` sono settati nelle variabili d'ambiente, che si possono importare dal file `Fleequid_docker.postman_environment.json` presente nella cartella `postman`

### Utenti
Lanciando il setup del progetto vengono creati due utenti:
1. email: `el_barto@gmail.com` password: `el_barto_password`
2. email: `skinner@gmail.com` password: `skinner_password`



