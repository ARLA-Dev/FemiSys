package com.arlainc.femisys.controllers;

import com.arlainc.femisys.models.Paciente;
import com.arlainc.femisys.models.Usuario;
import com.arlainc.femisys.services.PacienteService;
import com.arlainc.femisys.services.PacienteServiceImpl;
import com.arlainc.femisys.services.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PacienteController {

    private final PacienteService pacienteService;

    @Autowired
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping("api/pacientes")
    public ResponseEntity<List<Paciente>> obtenerPacientes() {
        List<Paciente> pacientes = pacienteService.obtenerPacientesActivos();
        return ResponseEntity.ok(pacientes);
    }
}