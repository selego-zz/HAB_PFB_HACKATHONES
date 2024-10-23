import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Flatpickr
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';

const DateRangePicker = ({ hackathonDate, setHackathonDate }) => {
    const datePickerRef = useRef(null);

    useEffect(() => {
        if (datePickerRef.current) {
            const fp = Flatpickr(datePickerRef.current, {
                mode: 'range',
                dateFormat: 'Y-m-d H:i',
                enableTime: true,
                defaultDate: hackathonDate,

                // No cerrar el calendario al seleccionar fechas
                closeOnSelect: false,

                // Para controlar el cierre del calendario
                onClose: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length < 2) {
                        // Si solo se selecciona una fecha, reabrir el calendario
                        setTimeout(() => {
                            instance.open();
                        }, 0);
                    }
                },

                onChange: function (selectedDates) {
                    // Si se seleccionaron dos fechas, actualizar el estado
                    if (selectedDates.length === 2) {
                        setHackathonDate(selectedDates);
                    }
                },
            });

            return () => {
                // Cleanup del flatpickr al desmontar el componente
                fp.destroy();
            };
        }
    }, [hackathonDate, setHackathonDate]);

    return <input ref={datePickerRef} className="input" name="hackathonDate" />;
};

DateRangePicker.propTypes = {
    hackathonDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    setHackathonDate: PropTypes.func.isRequired,
};

export default DateRangePicker;
