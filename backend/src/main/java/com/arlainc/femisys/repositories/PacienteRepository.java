package com.arlainc.femisys.repositories;

import com.arlainc.femisys.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query("SELECT p FROM Paciente p WHERE p.borrado = :borrado ORDER BY TRIM(p.paciente) ASC")
    List<Paciente> findByBorrado(@Param("borrado") int borrado);

    Paciente findByCedula(String cedula);
}
