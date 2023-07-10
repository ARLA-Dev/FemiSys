package com.arlainc.femisys.controllers;

import com.arlainc.femisys.models.Consulta;
import com.arlainc.femisys.services.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    private final ConsultaService consultaService;

    @Autowired
    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping
    public ResponseEntity<List<Object[]>> obtenerConsultasOrdenadasPorFecha() {
        List<Object[]> consultas = consultaService.findAllOrderByFechaDescWithPaciente();
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/{cedula}")
    public List<Consulta> obtenerConsultasPorCedula(@PathVariable String cedula) {
        return consultaService.obtenerConsultasPorCedula(cedula);
    }
}
