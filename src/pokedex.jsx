import { useState, useRef, useEffect } from "react";
import PokemonItem from "./PokemonItem";
import PokemonSuggestions from "./PokemonSuggestions";
import {v4 as uuid} from 'uuid';
import Swal from 'sweetalert2';

import './pokedex.css'

const KEY="pokemon-agenda"; // Nombre para el localStorage

function PokemonList() {
    const [pokemons, setPokemons] = useState(
        JSON.parse(localStorage.getItem(KEY)) ? JSON.parse(localStorage.getItem(KEY)) : []
    );

    // Referencias para los campos del formulario
    const nameRef = useRef();
    const typeRef = useRef();
    const levelRef = useRef();
    const regionRef = useRef();
    
    // Estado para el campo de nombre para las sugerencias
    const [nameInput, setNameInput] = useState('');

    // Guardar en localStorage cuando cambie la lista de pokémon
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(pokemons));
    }, [pokemons]);
    
    // Agregar un nuevo Pokémon
    const agregarPokemon = () => {
        // Usar el estado nameInput en lugar del ref
        const name = nameInput;
        const type = typeRef.current.value;
        const level = levelRef.current.value;
        const region = regionRef.current.value;
        
        // Validación básica
        if (name === '' || type === '' || level === '' || region === '') {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos',
                icon: 'warning',
                confirmButtonColor: '#3f51b5'
            });
            return;
        }
        
        const id = uuid();
        
        setPokemons((prevPokemons) => {
            const newPokemon = {
                id: id,
                name: name,
                type: type,
                level: parseInt(level),
                region: region,
                favorite: false
            }
            return [...prevPokemons, newPokemon];
        });
        
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
            title: '¡Pokémon agregado!',
            text: `${name} ha sido agregado a tu agenda.`,
            icon: 'success',
            confirmButtonColor: '#43a047'
        });
        
        // Limpiar formulario
        setNameInput(""); // Limpiar el estado del nombre
        typeRef.current.value = "";
        levelRef.current.value = "";
        regionRef.current.value = "";
    }
    
    // Eliminar un Pokémon
    const eliminarPokemon = (id) => {
        const newPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
        setPokemons(newPokemons);
    }
    
    // Eliminar todos los Pokémon favoritos
    const eliminarFavoritos = () => {
        const favoritesCount = pokemons.filter(pokemon => pokemon.favorite).length;
        
        if (favoritesCount === 0) {
            Swal.fire(
                'Información',
                'No hay Pokémon marcados como favoritos para eliminar.',
                'info'
            );
            return;
        }
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar ${favoritesCount} Pokémon marcados como favoritos?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const newPokemons = pokemons.filter((pokemon) => !pokemon.favorite);
                setPokemons(newPokemons);
                
                Swal.fire(
                    '¡Eliminados!',
                    'Los Pokémon favoritos han sido eliminados correctamente.',
                    'success'
                );
            }
        });
    }
    
    // Cambiar estado favorito de un Pokémon
    const cambiarFavorito = (id) => {
        const newPokemons = [...pokemons];
        const pokemon = newPokemons.find((pokemon) => pokemon.id === id);
        pokemon.favorite = !pokemon.favorite;
        setPokemons(newPokemons);
    }
    
    // Editar un Pokémon
    const editarPokemon = (id, updatedPokemon) => {
        const newPokemons = pokemons.map(pokemon => 
            pokemon.id === id ? {...pokemon, ...updatedPokemon} : pokemon
        );
        setPokemons(newPokemons);
    }
    
    // Contar Pokémon no favoritos
    const cantidadPokemonNoFavoritos = () => {
        return pokemons.filter((pokemon) => !pokemon.favorite).length;
    }
    
    // Componente para mostrar resumen
    const ResumenPokemons = () => {
        const cantidad = cantidadPokemonNoFavoritos();
        if (cantidad > 1) {
            return (
                <div className="alert alert-info mt-3">
                    Tienes {cantidad} Pokémones sin marcar como favoritos
                </div>
            );
        } else if (cantidad === 1) {
            return (
                <div className="alert alert-info mt-3">
                    Tienes 1 Pokémon sin marcar como favorito
                </div>
            );
        } else {
            return (
                <div className="alert alert-success mt-3">
                    ¡Todos tus Pokémon están marcados como favoritos!
                </div>
            );
        }   
    }
    
    return (
        <>
             <header className="header-titulo">
                <h1>Evaluacion numero 3 <br/>Front end</h1>
            </header>

            {/* Formulario para agregar Pokémon */}     
            <section className="section-pokedex">
                <div className="div-pokedex">
                    <div className='div-formulario'>
                        <h2>POKE&nbsp;DEX</h2> {/*&nbsp; = espacio no separable (non-breaking space). */}

                        <div className="inputs">
                            <label className="form-label">Nombre del Pokemon:</label>
                            <input 
                                ref={nameRef} 
                                className="form-control" 
                                type="text" 
                                placeholder="Agrega un nombre" 
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)} />
                            <PokemonSuggestions inputValue={nameInput} 
                                onSelect={(pokemonName) => {
                                setNameInput(pokemonName);nameRef.current.value = pokemonName;
                                }}/>

                            <label className="form-label">Elemento del Pokemon:</label>
                            <input ref={typeRef} className="form-control" type="text" placeholder="Agrega el tipo" />
                            
                            <label className="form-label">Nivel de Pokemon:</label>
                            <input ref={levelRef} className="form-control" type="number" min="1" max="100" placeholder="Agrega un Nivel" />

                            <label className="form-label">Región de origen:</label>
                            <input ref={regionRef} className="form-control" type="text" placeholder="Agregar Región" />

                            {/* Botones de ingreso */}            
                            <div className="botones">
                                <button 
                                    type="button" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        agregarPokemon();
                                    }} 
                                    className="btn btn-success ms-2">
                                    <i className="bi bi-plus-circle-fill me-2"></i>Agregar Pokémon
                                </button>
                                <button 
                                    type="button" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        eliminarFavoritos();
                                    }} 
                                    className="btn btn-danger">
                                    <i className="bi bi-trash me-2"></i>Eliminar Favoritos
                                </button>
                            </div>
                        </div>



                    </div>
                                
                                

                    {/* Tabla de Pokémon */}
                    <div className="output">
                        <h2>Lista de pokemones</h2>

                        <div className="div-listado">
                            {pokemons.length > 0 ? (
                                <div className="scroll-table">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Favorito</th>
                                                <th>Nombre</th>
                                                <th>Tipo</th>
                                                <th>Nivel</th>
                                                <th>Región</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pokemons.map((pokemon) => (
                                                <PokemonItem 
                                                    key={pokemon.id} 
                                                    pokemon={pokemon} 
                                                    cambiarFavorito={cambiarFavorito}
                                                    eliminarPokemon={eliminarPokemon}
                                                    editarPokemon={editarPokemon}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="alert alert-warning">
                                    No hay Pokémon registrados. ¡Agrega algunos!
                                </div>
                            )}
                        </div>

                        {/*Tabla de alerta */}
                        <div className="div-tarjeta">
                            <ResumenPokemons />
                        </div>

                    </div>
                </div>
            </section>
            
            <footer className="pie ">
                <h4>Nombres:</h4>
                <p> - Benjamin Maldonado <br/> - Victor Riquelme </p>
            </footer>   
        </>
    );
}

export default PokemonList;