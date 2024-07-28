package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Consulta;
import com.arlainc.femisys.repositories.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ConsultaServiceImpl implements ConsultaService {

    private final ConsultaRepository consultaRepository;

    @Autowired
    public ConsultaServiceImpl(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    @Override
    public List<Object[]> findAllOrderByFechaDescWithPaciente() {
        return consultaRepository.findAllOrderByFechaDescWithPaciente();
    }

    @Override
    public List<Consulta> obtenerConsultasPorCedula(String cedula) {
        return consultaRepository.findByCedula(cedula);
    }

    @Override
    public Consulta obtenerConsulta(Long idConsulta) {
        Optional<Consulta> consultaOpt = consultaRepository.findById(idConsulta);
        return consultaOpt.orElse(null);
    }

    @Override
    public Consulta crearConsulta(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    @Override
    public Object[] obtenerDetalleConsulta(Long idConsulta) {
        return consultaRepository.findDetalleConsultaById(idConsulta);
    }

    @Override
    public Object[] obtenerNotaConsulta(Long idConsulta) {
        return consultaRepository.findNotaConsultaById(idConsulta);
    }
    @Override
    public long contarTotalConsultas() {
        return consultaRepository.count();
    }
    @Override
    public long contarConsultasThisYear() {
        return consultaRepository.countConsultasThisYear();
    }

    @Override
    public List<Object[]> contarConsultasPorMesUltimoAnio() {
        return consultaRepository.contarConsultasPorMesUltimoAnio();
    }

    @Override
    public void eliminarConsulta(Long idConsulta) {
        consultaRepository.deleteById(idConsulta);
    }

    @Override
    public Consulta modificarConsulta(Long idConsulta, Consulta consulta) {
        if (consultaRepository.existsById(idConsulta)) {
            consulta.setId(Math.toIntExact(idConsulta));
            return consultaRepository.save(consulta);
        } else {
            return null;
        }
    }



}

