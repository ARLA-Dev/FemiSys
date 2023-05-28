package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Paciente;
import java.util.List;

public interface PacienteService {
    List<Paciente> obtenerPacientesActivos();

}
