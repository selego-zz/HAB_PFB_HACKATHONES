// Importamos las prop-types.
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const HackatonsFilters = ({ filters, addFilter, removeFilter }) => {
    const [name, setName] = useState('');
    //[{ campo1: valor1 }, { campo2: valor2 }]
    for (const filter of filters) {
        const { key } = Object.keys(filter);
        const value = filter[key];
        switch (key) {
            case 'name':
                setName(value);
                break;

            case 'location':
                setLocation(value);
                break;

                case 'inscriptionDate':
                    setInscriptionDate(value)
                    break;

                case 'inscriptionEnd':
                    setInscriptionEnd(value)
                    break;

                case 'maxParticipants': 
                    setMaxParticipants(value) 
                    break;

                case 'online':
                    setOnline(value)
                    break;





            default:
                break;
        }
    }
    return... onChange = {(e) => {
        if (e.target.value.length < 1 ) {
            removeFilter("name")
        } else {
            addFilter ({name:e.target.value})
        }
    }}
};

// Validamos las props.
HackatonsFilters.propTypes = {
    filters: PropTypes.arrayOf(
        PropTypes.shape({ field: PropTypes.string.isRequired }),
    ).isRequired,
    addFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired,
};

export default HackatonsFilters;
