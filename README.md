# Flawed Messaging System

## Descrizione del progetto

Flawed Messaging System è un sistema di gestione delle notifiche che supporta l'invio di notifiche via email e SMS. Il sistema è progettato per essere resiliente e performante, con funzionalità di monitoraggio in tempo reale, gestione degli errori e ottimizzazione delle prestazioni.

## Funzionalità implementate

- *POST /api/v1/notifications*: Endpoint per inviare notifiche via email o SMS.
- *Redis*: Coda per gestire le notifiche in attesa di invio.
- *Servizio di processore*: Elabora le notifiche dalla coda e le invia a un servizio esterno simulato.
- *Dashboard*: Un'interfaccia web per monitorare lo stato delle notifiche in tempo reale.

## Setup dell'ambiente

1. *Clona il repository:*
   bash
   git clone https://github.com/tuo-utente/flawed-messaging-node.git
   cd flawed-messaging-node

2.	Installa le dipendenze:
	•	Assicurati di avere Node.js e npm installati.
	•	Nella cartella api, esegui:

    npm install


3.	Configurazione di Docker:
	•	Costruisci i container Docker:

    docker-compose build


	•	Avvia i container Docker:

    docker-compose up


4.	Esegui il progetto:
	•	Avvia il server API:

node server.js


5.	Test delle API:
	•	Puoi testare l’endpoint /api/vl/notifications utilizzando strumenti come Postman o cURL.

Scelte tecniche

Resilienza
	•	Circuit Breaker: Per evitare sovraccarichi nel sistema, abbiamo implementato un circuito breaker che previene l’invio di notifiche in caso di errore persistente.
	•	Retry con Backoff Esponenziale: In caso di fallimento dell’invio della notifica, il sistema ritenta con un backoff esponenziale per evitare sovraccarichi.

Ottimizzazione delle prestazioni
	•	Redis per la gestione delle code: Le notifiche vengono accodate in Redis per garantire un’elaborazione asincrona e ridurre il carico sulle API principali.
	•	Compressione delle risposte: Abbiamo implementato la compressione delle risposte HTTP per migliorare la velocità di trasmissione dei dati.
	•	Clustering di Node.js: Per sfruttare più core CPU, il server Node.js è configurato in modalità cluster.

Tecnologie utilizzate
	•	Node.js / Express per il backend.
	•	Redis per la gestione della coda di notifiche.
	•	WebSocket per aggiornamenti in tempo reale sulla dashboard.
	•	Docker per la containerizzazione del sistema.
    •	React per il frontend.
