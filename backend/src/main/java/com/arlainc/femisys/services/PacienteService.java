package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Paciente;
import java.util.List;

public interface PacienteService {
    List<Paciente> obtenerPacientesActivos();
    Paciente crearPaciente(Paciente paciente);
    public void marcarPacienteComoBorradoPorCedula(String cedula);
    Paciente buscarPorCedula(String cedula);
}