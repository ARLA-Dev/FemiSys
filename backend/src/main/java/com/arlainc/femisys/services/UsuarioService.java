package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Usuario;
import com.arlainc.femisys.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodos() {

        return usuarioRepository.findAll();

    }

}
