package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Consulta;
import java.util.List;

public interface ConsultaService {

    List<Object[]> findAllOrderByFechaDescWithPaciente();

    List<Consulta> obtenerConsultasPorCedula(String cedula);

    Consulta obtenerConsulta(Long idConsulta);

    Consulta crearConsulta(Consulta consulta);

    Consulta modificarConsulta(Long idConsulta, Consulta consulta);

    Object[] obtenerDetalleConsulta(Long idConsulta);

    Object[] obtenerNotaConsulta(Long idConsulta);
    long contarTotalConsultas();
    long contarConsultasThisYear();

    List<Object[]> contarConsultasPorMesUltimoAnio();

    void eliminarConsulta(Long idConsulta);

}
