*Za pokretanje aplikacije potrebno je imati instaliran Docker*
Aplikacija se sastoji od 3 ključne komponente:
# ExpressJS REST API 
## Uloga
- Rukuje i obrađuje autentikacijsko stanje
- Služi kao posrednik u interakciji korisnika s OpenAI i HuggingFace API-jima
- Obrađuje podatke koji se spremaju u bazu.
## Endpointi
- GET `/conversation/:id` -> Dohvaća Conversation objekt sa zadanim id-jem iz baze podataka
- GET `/conversations` -> Dohvaća sve Conversation objekte koji pripadaju korisniku koji je trenutno ulogiran
- POST `/send_message` -> Šalje korisnički upit na API. Upit se prosljeđuje na OpenAI i HuggingFace API-je.
- GET `/get_messages/:conversation_id` -> Dohvaća sve poruke koje pripadaju Conversation-u sa zadanim conversation_id-jem
- POST `/register` -> Registrira korisnika i stvara User objekt u bazi podataka
- POST `/login` -> Logira korisnika i izrađuje JWT za sjednicu.
- POST `/logout` -> Logouta korisnika
- GET `/get_user` -> Dohvaća podatke o korisniku koji je trenutno ulogiran.
## Upute za pokretanje
*Za pokretanje API ja i baze podataka potrebno je imati instaliran Docker*
Budući da API ovisi o bazi podataka ove dvije komponente spojene su u jednu cjelinu.
API se spaja na OpenAI i HuggingFace API-je pa je potrebno podesiti `OPENAI_API_KEY` i `HF_ACCESS_TOKEN` varijable u .env datoteci:
```js
...
OPENAI_API_KEY="openai_api_key"
HF_ACCESS_TOKEN="huggingface_access_token"
...
```
Za pokretanje REST API-ja i baze podataka potrebno je se pozicionirati u direktoriju `server` i izvršiti sljedeće naredbe:
```shell
docker-compose build
docker-compose up
```
Nakon izvršavanja REST API je pokrenut na URL-u: `http://localhost:3000`  
# PostgreSQL baza podataka 
## Uloga
- Sprema podatke o korisnicima i njihovim prethodnim upitima.
## Upute za pokretanje
Kako je REST API ovisan o bazi podataka, baza se pokreće zajedno s REST API-jem kako je opisano u prethodnoj cjelini.
# Vite + React web sučelje 
## Uloga
Omogućuje jednostavnu i intuitivnu interakciju s REST API-jem i bazom podataka.  
## Upute za pokretanje
*Za pokretanje web sučelja potrebno je imati instaliran Docker*
Za pokretanje web sučelja potrebno je se pozicionirati u direktoriju `client` i izvršiti sljedeće naredbe:
```shell
docker build -t client .
docker run -p 5173:5173 client
```
Nakon izvršavanja sučelje je vidljivo na URL-u: `http://localhost:5173`



