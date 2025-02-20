// Esercizio
// 1. Partendo dall’esercizio precedente, utilizziamo le API che abbiamo sviluppato durante il modulo su ExpressJS.
// 2. Al caricamento dell’applicazione, sfruttando l’hook useEffect, recuperiamo la lista dei post dal backend e la mostriamo nella pagina.


// step 1: apriamo il nostro back end avviamolo e testiamo con postmat√
// step 2: insattalliamo il pacchetto cors per darci accesso dal front end al back end√
// step 3: effettuaiamo la richiesta api tramite effect e controlliamo se arriva√
// step 4: modifichiamo il nostro articolo sia il map√
// step 5: modifichiamo l'invio del form in base ai dati


// importiamo la libreria axios per effettuare le chiamate Api
import axios from "axios";

// importiamo useState e lo useEffect
import { useState, useEffect } from "react";

// importiamo l'array di oggetti
// import dataArticoli from "../data/dataArticoli"

// mettiamo l'oggetto vuoto all'interno di una variabile
const initialFormData = {
    //aggiungiamo tutte le proprietà che vogliamo mappare e assegniamo loro un valore iniziale.
    title: "",
    content: "",
    image: "",
    tags: [],
    pubblicato: false,
}

export default function Articoli() {


    // creiamo una variabile di stato che conterrà il nostro array di oggetti
    const [articols, setArticols] = useState([])
    console.table(articols)

    // Funzione di richiesta Api
    function fetchArticols() {
        // richiesta di chiamata a localhost 3000
        axios.get('http://localhost:3000/posts')
            // prendi i dati di risposta e inseriscili a res.data
            .then((res) => setArticols(res.data),

            )

            .catch((error) => {
                console.error("Errore durante il recupero dei dati:", error);
            });

    }


    // chiamata api effettuata all'avvio del server
    useEffect(() => { fetchArticols() }, []);



    // creiamo una variabile di stato che sarà riempita dell'oggetto sopra indicato
    const [formData, setFormData] = useState(initialFormData);

    // Creiamo una funzione unica per gestire l'evento onChange dei nostri campi.
    function handleFormData(event) {
        // gestiamo il valore se è preso da checkbox (true|false) oppure da text (stringhe)
        const value = event.target.type === "checkbox" ?
            event.target.checked : event.target.value;

        // all'avvio della funzione richiama currentForm Data
        setFormData((currentformData) => ({
            // prendi tutto l'array 
            ...currentformData,
            // e aggiungigli con condizione se la proprietà è tags 
            [event.target.name]: event.target.name === "tags" ?
                // allora il valore inseriscilo all'interno delle quadre
                [event.target.value]
                // altrimenti
                :
                // inserisci solo il valore
                event.target.value
        }));
    }


    // Creiamo una funzione unica per gestire l'invio del form.
    const handleSubmitForm = (e) => {
        e.preventDefault()

        // inseriamo l'oggetto creato all'interno del nostro array
        // diciamo a setArticols di prenderci il nostro array corrente
        setArticols(currentarticols =>
            // copia l'array corrente 
            [...currentarticols,
            {
                // aggiungi id in ordine crescente con condizione se vuota parti da 1 
                id: currentarticols.length === 0 ?
                    1 : currentarticols[currentarticols.length - 1].id + 1,
                // aggiungi il form inserito dall'utente
                ...formData
            }
            ]);
        // resetta il form utilizzando il preset di initialFormData
        setFormData(initialFormData)
    }


    // funzione di rimozione dei post
    function removeArticols(id) {

        // filter sull'array
        const updateArticols = articols.filter(articol => {
            return articol.id !== id
        })

        // aggiorna gli articoli 
        setArticols(updateArticols);
    }

    return (
        <section className="section-articoli">
            {/* contenitore esterno */}
            <div className="container">
                <h2>Inserisci un Nuovo articolo</h2>
                {/* PARTE OUTPUT FORM */}
                <form className="form-articoli"
                    onSubmit={handleSubmitForm}>
                    {/* input titolo */}
                    <input
                        type="text"
                        // questo sara event.target.name
                        name="title"
                        // questo sarà event.target.value
                        // lo riempiamo con il valore corretto della proprietà mappata
                        value={formData.title}
                        onChange={handleFormData}
                        placeholder="Inserisci il titolo"
                    />


                    {/* input categoria */}
                    <input
                        type="text"
                        // questo sara event.target.name
                        name="tags"
                        // questo sarà event.target.value
                        // lo riempiamo con il valore corretto della proprietà mappata
                        value={formData.tags}
                        onChange={handleFormData}
                        placeholder="Inserisci i tags"
                    />


                    {/* input contenuto */}
                    <textarea
                        type="textarea"
                        // questo sara event.target.name
                        name="content"
                        // questo sarà event.target.value
                        // lo riempiamo con il valore corretto della proprietà mappata
                        value={formData.content}
                        onChange={handleFormData}
                        placeholder="Inserisci il contenuto"
                    />

                    {/* input autore */}
                    <input
                        type="textarea"
                        // questo sara event.target.name
                        name="image"
                        // questo sarà event.target.value
                        // lo riempiamo con il valore corretto della proprietà mappata
                        value={formData.image}
                        onChange={handleFormData}
                        placeholder="Inserisci l'url dell'immagine"
                    />
                    <div className="d-flex justify-content-center">
                        <input
                            name="pubblicato"
                            checked={formData.pubblicato}
                            onChange={handleFormData}
                            className="mx-2 my-0"
                            type="checkbox"
                        />
                        <label htmlFor="pubblicato">Pubblicato</label>
                    </div>
                    <div className="box-btn">
                        <button type="submit" className="btn btn-secondary btn-lg">
                            Aggiungi Articolo
                        </button>
                    </div>

                </form>


                {/* PARTE OUTPUT ARTICOLI*/}
                {/* condizione di output */}
                {articols.length === 0 ?

                    // CONDIZIONE VERA
                    <h2 className="m-3">Non ci sono Articoli</h2>
                    // Altrimenti
                    :
                    // CONDIZIONE FALSA
                    <div className="box-articoli">

                        {/* singolo articolo*/}
                        {/* effettuiamo map su articols che è il nostro array dinamico */}
                        {articols.map(articolo => (
                            <div key={articolo.id} className="toast d-block">

                                {/* contenitore header */}
                                <div className="toast-header">
                                    {/* titolo */}
                                    <strong className="me-auto">{articolo.title}</strong>

                                    {/* condizione per badge pubblicato*/}
                                    {articolo.pubblicato ?
                                        // se è vero badge verde
                                        <span className="badge text-bg-success mx-2 p-2">
                                            Pubblicato
                                        </span>
                                        // altrimento
                                        :
                                        // se è falso badge rosso
                                        <span className="badge text-bg-danger mx-2 p-2">
                                            Non pubblicato
                                        </span>}

                                    {/* button delete */}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="toast"
                                        aria-label="Close"
                                        // onclick con funzione inserita in una callback function per prevenire attivazione automatica
                                        onClick={() => removeArticols(articolo.id)}
                                    >

                                    </button>
                                </div>

                                {/* contenitore corpo */}
                                <div className="toast-body">

                                    {/* contenuto */}
                                    <p>{articolo.content}</p>
                                    {/* immagine */}
                                    <div className="box-articolo-image">
                                        <img src={articolo.image} alt={articolo.title} />
                                    </div>


                                    {/* categoria */}
                                    <ul className="category-list">
                                        {articolo.tags?.map((tag, index) => (
                                            <li key={index}>
                                                <a href="#">{tag}</a>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        ))}
                    </div>
                }


            </div>
        </section >
    )

}