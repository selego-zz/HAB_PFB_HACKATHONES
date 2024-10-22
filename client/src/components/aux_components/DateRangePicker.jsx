//useRef lo uso para asocuar flatpickr a los input date
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

//Flatpickr
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css'; // Puedes cambiar el tema si quieres

const DateRangePicker = ({ hackathonDate, setHackathonDate }) => {
    const datePickerRef = useRef(null);

    useEffect(() => {
        if (datePickerRef.current) {
            Flatpickr(datePickerRef.current, {
                mode: 'range',
                dateFormat: 'Y-m-d H:i',
                enableTime: true,
                defaultDate: hackathonDate,

                //para que no se cierre seleccionando rangos
                closeOnSelect: false,
                onClose: function (selectedDates, dateStr, instance) {
                    // Check if two dates (start and end) have been selected
                    if (selectedDates.length < 2) {
                        instance.open(); // Reopen the calendar if only one date is selected
                    }
                },

                onChange: function (selectedDates) {
                    setHackathonDate(selectedDates);
                },
            });
        }
    }, [hackathonDate, setHackathonDate]);

    return <input ref={datePickerRef} className="input" name="hackathonDate" />;
};

DateRangePicker.propTypes = {
    hackathonDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    setHackathonDate: PropTypes.func.isRequired,
};
export default DateRangePicker;
