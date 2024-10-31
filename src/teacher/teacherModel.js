const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre del profesor es requerido'],
        trim: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo nombre'], // Elimina espacios en blanco al principio y al final
    },
    lastName: {
        type: String,
        required: [true, 'El apellido del profesor es requerido'],
        trim: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo apellidos']
    },
    location: {
        type: String,
        required: true
    },
    documentType: {
        type: String,
        required: [true, 'El tipo de documento es requerido'],
        enum: {
            values: ['Cedula', 'Cedula extranjera', 'Pasaporte'],
            message: '{VALUE} no es un tipo de documento válido'
        }
    },
    documentNumber: {
        type: Number,
        required: [true, 'El campo cedula es requerido'],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value) && /^\d{7,14}$/.test(this.documentNumber);
            },
            message: 'La cédula debe contener solo números y debe contener entre 7 y 14 dígitos numéricos'
        }// Garantiza que cada número de documento sea único
    },
    phoneNumber: {
        type: Number,
        required: [true, 'El teléfono es obligatorio'],
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value) && /^\d{7,14}$/.test(this.phoneNumber);
            },
            message: 'La cédula debe contener solo números y debe contener entre 7 y 14 dígitos numéricos'
        }
    },
    profession: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo profession']
    },
    area: {
        type: String,
        required: [true, 'El area del profesor es requerida'],
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo profession']
    },
    thematic: {
        type: String,
        trim: true
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;