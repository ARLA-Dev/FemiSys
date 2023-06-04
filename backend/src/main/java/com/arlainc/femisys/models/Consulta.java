package com.arlainc.femisys.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "consultas")
@Data
public class Consulta {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "cedula")
    private String cedula;

    @Column(name = "peso")
    private double peso;

    @Column(name = "fecha")
    private String fecha;

    @Column(name = "nota_evolutiva")
    private String nota_evolutiva;

    @Column(name = "recipe")
    private String recibe;

    @Column(name = "indicaciones")
    private String indicaciones;
}
