import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function PokemonItem({ pokemon, cambiarFavorito, eliminarPokemon, editarPokemon }) {
    const { id, name, type, level, region, favorite } = pokemon;
    
    // Estado para controlar el modo de edición
    const [isEditing, setIsEditing] = useState(false);
    const [editedPokemon, setEditedPokemon] = useState({
        name: name,
        type: type,
        level: level,
        region: region
    });
    
    // Estado para almacenar la URL de la imagen del Pokémon
    const [pokemonImage, setPokemonImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    
    // Buscar la imagen del Pokémon en la PokéAPI
    useEffect(() => {
        const fetchPokemonImage = async () => {
            setIsLoading(true);
            setImageError(false);
            
            try {
                // Convertir el nombre a minúsculas y eliminar espacios para la URL
                const formattedName = name.toLowerCase().replace(/\s+/g, '-');
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedName}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setPokemonImage(data.sprites.front_default);
                } else {
                    // Si no se encuentra el Pokémon, usar una imagen genérica
                    setImageError(true);
                }
            } catch (error) {
                console.error('Error al obtener la imagen del Pokémon:', error);
                setImageError(true);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchPokemonImage();
    }, [name]);
    
    // Función para cambiar el estado de favorito
    const handleFavoriteChange = () => {
        cambiarFavorito(id);
    };
    
    // Función para eliminar el Pokémon con ventana modal de sweetalert2
    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar a ${name} de tu agenda?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarPokemon(id);
                Swal.fire(
                    '¡Eliminado!',
                    `${name} ha sido eliminado correctamente.`,
                    'success'
                );
            }
        });
    };
    
    // Función para activar el modo de edición
    const handleEdit = () => {
        setIsEditing(true);
    };
    
    // Función para guardar los cambios
    const handleSave = () => {
        editarPokemon(id, editedPokemon);
        setIsEditing(false);
    };
    
    // Función para cancelar la edición
    const handleCancel = () => {
        setEditedPokemon({
            name: name,
            type: type,
            level: level,
            region: region
        });
        setIsEditing(false);
    };
    
    // Función para manejar cambios en los campos de edición
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPokemon(prev => ({
            ...prev,
            [name]: name === 'level' ? parseInt(value) : value
        }));
    };
    
    return (
        <tr>
            <td className="text-center">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={favorite} 
                    onChange={handleFavoriteChange}
                />
            </td>
            
            {isEditing ? (
                <>
                    <td>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="name"
                            value={editedPokemon.name} 
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="type"
                            value={editedPokemon.type} 
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input 
                            type="number" 
                            className="form-control form-control-sm" 
                            name="level"
                            min="1" 
                            max="100"
                            value={editedPokemon.level} 
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="region"
                            value={editedPokemon.region} 
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <button className="btn btn-success" onClick={handleSave}>
                                <i className="bi bi-check-lg"></i>
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancel}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </td>
                </>
            ) : (
                <>
                    <td>
                        <div className="d-flex align-items-center">
                            {isLoading ? (
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            ) : imageError ? (
                                <img 
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                                    alt="Poké Ball" 
                                    width="30" 
                                    height="30" 
                                    className="me-2 pokemon-image imagen-poke" 
                                />
                            ) : (
                                <img 
                                    src={pokemonImage} 
                                    alt={name} 
                                    width="40" 
                                    height="40" 
                                    className="me-2 pokemon-image imagen-poke" 
                                />
                            )}
                            {name}
                        </div>
                    </td>
                    <td>{type}</td>
                    <td>{level}</td>
                    <td>{region}</td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <button className="btn btn-primary" onClick={handleEdit}>
                                <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-danger" onClick={handleDelete}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </>
            )}
        </tr>
    );
}

export default PokemonItem;
