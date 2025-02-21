# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


<!-- Esercizio -->
<!-- Parte 1 -->
1. Partendo dall’esercizio precedente, utilizziamo le API che abbiamo sviluppato durante il modulo su ExpressJS.

2. Al caricamento dell’applicazione, sfruttando l’hook useEffect, recuperiamo la lista dei post dal backend e la mostriamo nella pagina.

<!-- Note -->
prima di far ciò, ricordatevi di installare e settare il modulo CORS sul vostro server di backend.
E ovviamente poi lanciarlo, sennò difficile possiate richiedergli qualcosa :

<!-- BONUS: -->
gestire la possibililtà che non ci siano ancora i post√


<!-- Parte 2  -->

<!-- Esercizio -->

Partendo dall’esercizio precedente, sviluppiamo parte delle CRUD e integriamo le API che abbiamo sviluppato durante il modulo su ExpressJS.

Gestiamo i campi e il submit del form √
assicuriamoci che questi dati vengano inviati al backend e correttamente salvati, per creare un nuovo post, e che quindi questo appaia anche in pagina.


<!-- BONUS: -->
Implementare la funzionalità di cancellazione, assicurandoci che funzioni sia sul frontend che sul backend (il post sparisce sulla pagina ma anche sul server). :metallica: