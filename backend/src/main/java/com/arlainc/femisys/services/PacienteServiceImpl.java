package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Paciente;
import com.arlainc.femisys.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteServiceImpl implements PacienteService{

    private final PacienteRepository pacienteRepository;

    @Autowired
    public PacienteServiceImpl(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Override
    public List<Paciente> obtenerPacientesActivos() {
        return pacienteRepository.findByBorrado(0);
    }

    @Override
    public Paciente crearPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    @Override
    public void marcarPacienteComoBorradoPorCedula(String cedula) {
        Paciente paciente = pacienteRepository.findByCedula(cedula);
        if (paciente != null) {
            paciente.setBorrado(1);
            pacienteRepository.save(paciente);
        }
    }

    @Override
    public Paciente buscarPorCedula(String cedula) {
        return pacienteRepository.findByCedula(cedula);
    }
}
