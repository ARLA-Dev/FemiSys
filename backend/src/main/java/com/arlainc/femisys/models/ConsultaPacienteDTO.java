package com.arlainc.femisys.models;

import lombok.Data;

@Data
public class ConsultaPacienteDTO {

    private String cedula;
    private int id;
    private double peso;
    private String fecha;
    private String paciente;

    public ConsultaPacienteDTO(String cedula, int id, double peso, String fecha, String paciente) {
        this.cedula = cedula;
        this.id = id;
        this.peso = peso;
        this.fecha = fecha;
        this.paciente = paciente;
    }
}
