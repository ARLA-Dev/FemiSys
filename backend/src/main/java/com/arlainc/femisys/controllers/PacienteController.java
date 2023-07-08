package com.arlainc.femisys.controllers;

import com.arlainc.femisys.models.Paciente;
import com.arlainc.femisys.models.Usuario;
import com.arlainc.femisys.services.PacienteService;
import com.arlainc.femisys.services.PacienteServiceImpl;
import com.arlainc.femisys.services.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping("api/pacientes")
    public ResponseEntity<Paciente> crearPaciente(@RequestBody Paciente paciente) {
        Paciente nuevoPaciente = pacienteService.crearPaciente(paciente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPaciente);
    }

    @PutMapping("api/pacientes/borrar/{cedula}")
    public ResponseEntity<String> marcarPacienteComoBorrado(@PathVariable("cedula") String cedula) {
        pacienteService.marcarPacienteComoBorradoPorCedula(cedula);
        return ResponseEntity.ok("Paciente marcado como borrado");
    }

    @GetMapping("api/pacientes/{cedula}")
    public ResponseEntity<Paciente> buscarPorCedula(@PathVariable String cedula) {
        Paciente paciente = pacienteService.buscarPorCedula(cedula);
        if (paciente != null) {
            return new ResponseEntity<>(paciente, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}