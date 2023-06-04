package com.arlainc.femisys.repositories;

import com.arlainc.femisys.models.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    @Query("SELECT new com.arlainc.femisys.models.ConsultaPacienteDTO(c.cedula, c.id, c.peso, c.fecha, p.paciente) " +
            "FROM Consulta c JOIN Paciente p ON c.cedula = p.cedula " +
            "ORDER BY c.id DESC, c.fecha DESC")
    List<Object[]> findAllOrderByFechaDescWithPaciente();
}



