import { useState, useEffect } from 'react';

function PokemonSuggestions({ inputValue, onSelect }) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const fetchPokemonSuggestions = async () => {
            if (inputValue.length < 2) {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            setLoading(true);
            try {
                // Se obtiene la lista de todos los pokemon con la librería pokeapi, son mas de 1000 
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
                const data = await response.json();
                
                // Se filtran los Pokemones que puedan coincidir con lo que escribe el usuario
                const filteredSuggestions = data.results
                    .filter(pokemon =>                                                 // Se recorre cada pokemon
                        pokemon.name.includes(inputValue.toLowerCase())          // Minusculas para que coincida con la entrada del usuario      
                    )
                    .map(pokemon => ({
                        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),            // Mayusculas para que coincida con la entrada del usuario
                        url: pokemon.url
                    }))
                    .slice(0, 5); // Con esto limitamos a 5 sugerencias 
                
                setSuggestions(filteredSuggestions);
                setShowSuggestions(filteredSuggestions.length > 0);
            } catch (error) {
                console.error('Error al obtener sugerencias de Pokémon:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        // Tecnica web debounce para evitar muchas solicitudes y asi poder sugerir los pokemones en el input en tiempo real
        const timeoutId = setTimeout(() => {
            fetchPokemonSuggestions();
        }, 300);                                //espera 300 milisegundos y luego ejecuta fetchPokemonSuggestions().
        return () => clearTimeout(timeoutId);
    }, [inputValue]);                           //Cuando el valor del input cambia, se ejecuta fetchPokemonSuggestions().

    const handleSelectSuggestion = (pokemonName) => {
        onSelect(pokemonName);
        setShowSuggestions(false);
    };

    if (!showSuggestions) {
        return null;
    }

    return (
        <div className="position-absolute bg-white border rounded shadow-sm w-100 z-index-dropdown">
            {loading ? (
                <div className="p-2 text-center">
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <ul className="list-group list-group-flush">
                    {suggestions.map((pokemon, index) => (
                        <li 
                            key={index} 
                            className="list-group-item list-group-item-action py-2 px-3 cursor-pointer"
                            onClick={() => handleSelectSuggestion(pokemon.name)}
                            style={{ cursor: 'pointer' }}
                        >
                            {pokemon.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PokemonSuggestions;
