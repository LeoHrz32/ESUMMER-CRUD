const Teacher = require('./teacherModel');

exports.createTeacher = async (req, res) => {
    try {
        const { documentNumber } = req.body;
        const profesorExistente = await Teacher.findOne({ documentNumber });

        if (profesorExistente) {
            return res.status(400).send({ message: 'El número de cédula ya está en uso' });
        }

        const teacher = new Teacher(req.body);

        await teacher.save();
        res.status(201).send(teacher);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.getAllteachers= async (req, res) => {
    try {
        const teachers = await Teacher.find();

        if(teachers.length <= 0) {
            return res.status(404).json({ message: 'No se encontraron profesores'})
        }

        res.status(200).send(teachers);
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener profesores' });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).send({ message: 'Profesor no encontrado' });
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['firstName', 'lastName', 'location', 'documentType', 'documentNumber', 'phoneNumber', 'profession', 'state', 'area', 'thematic'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ message: 'Actualización no permitida' });
        }

        if (req.body.documentNumber) {
            const profesorExistente = await Teacher.findOne({ documentNumber: req.body.documentNumber });
            if (profesorExistente && profesorExistente._id.toString() !== req.params.id) {
                return res.status(400).send({ message: 'El número de cédula ya está en uso' });
            }
        }

        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).send({ message: 'Profesor no encontrado' });
        }

        updates.forEach(update => teacher[update] = req.body[update]);
        await teacher.save();
        res.status(200).send(teacher);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
            
        if (!teacher) {
            return res.status(404).send({ message: 'Profesor no encontrado' });
        }
        res.status(200).send({ message: 'Profesor eliminado' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
//new
exports.toggleTeacherStatus = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        await Teacher.updateOne({ _id: teacher._id }, { $set: { state } });
        res.json({ message: `Usuario ${state ? 'activado' : 'desactivado'} correctamente`, teacher });
    } catch (error) {
        console.error(`Error al ${state ? 'activar' : 'desactivar'} usuario:`, error.message);
        res.status(500).json({ message: `Error al ${state ? 'activar' : 'desactivar'} usuario` });
    }
};
