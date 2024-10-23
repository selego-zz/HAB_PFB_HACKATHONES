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

                closeOnSelect: false,

                // Para controlar el cierre del calendario
                onClose: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length < 2) {
                        // Guardar la posición actual del scroll
                        const scrollPos = window.scrollY;

                        setTimeout(() => {
                            instance.open();
                            // Restaurar la posición del scroll después de abrir el calendario
                            window.scrollTo(0, scrollPos);
                        }, 0);
                    }
                },

                onChange: function (selectedDates) {
                    if (selectedDates.length === 2) {
                        setHackathonDate(selectedDates);
                    }
                },
            });

            // Para desmontarlo y mantener limpio el DOM
            return () => {
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
