package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Consulta;
import java.util.List;

public interface ConsultaService {

    List<Object[]> findAllOrderByFechaDescWithPaciente();
}
