package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Paciente;
import com.arlainc.femisys.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
