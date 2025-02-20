

// importiamo la libreria axios per effettuare le chiamate Api
import axios from "axios";

// importiamo useState e lo useEffect
import { useState, useEffect } from "react";

// importiamo l'array di oggetti
import dataArticoli from "../data/dataArticoli"

// mettiamo l'oggetto vuoto all'interno di una variabile
const initialFormData = {
    //aggiungiamo tutte le proprietà che vogliamo mappare e assegniamo loro un valore iniziale.
    titolo: "",
    autore: "",
    contenuto: "",
    categoria: "",
    pubblicato: false,
}

export default function Articoli() {


    // creiamo una variabile di stato che conterrà il nostro array di oggetti
    const [articols, setArticols] = useState(dataArticoli)
    console.table(articols)

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
            // e aggiungigli
            [event.target.name]: value,
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
                        name="titolo"
                        // questo sarà event.target.value
                        // lo riempiamo con il valore corretto della proprietà mappata
                        value={formData.titolo}
                        onChange={handleFormData}
                        placeholder="Inserisci il titolo"
                    />


                    {/* input categoria */}
                    <input
                        type="text"
                        // questo sara event.target.name
                        name="categoria"
                        // questo sarà event.target.value
                        // lo riempiamo con il valore corretto della proprietà mappata
                        value={formData.categoria}
                        onChange={handleFormData}
                        placeholder="Inserisci la categoria"
                    />


                    {/* input contenuto */}
                    <textarea
                        type="textarea"
                        // questo sara event.target.name
                        name="contenuto"
                        // questo sarà event.target.value
                        // lo riempiamo con il valore corretto della proprietà mappata
                        value={formData.contenuto}
                        onChange={handleFormData}
                        placeholder="Inserisci il contenuto"
                    />

                    {/* input autore */}
                    <input
                        type="textarea"
                        // questo sara event.target.name
                        name="autore"
                        // questo sarà event.target.value
                        // lo riempiamo con il valore corretto della proprietà mappata
                        value={formData.autore}
                        onChange={handleFormData}
                        placeholder="Inserisci l'autore"
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
                                    <strong className="me-auto">{articolo.titolo}</strong>
                                    {/* categoria */}
                                    <span className="badge text-bg-secondary mx-2 p-2">
                                        {articolo.categoria}
                                    </span>

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
                                    <p>{articolo.contenuto}</p>
                                    {/* autore */}
                                    <p className="autore">{articolo.autore}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                }


            </div>
        </section >
    )

}