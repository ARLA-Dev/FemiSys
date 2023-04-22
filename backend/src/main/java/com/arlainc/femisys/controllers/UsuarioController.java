package com.arlainc.femisys.controllers;

import com.arlainc.femisys.models.Usuario;
import com.arlainc.femisys.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/usuarios")
    public List<Usuario> obtenerUsuarios() {

        List<Usuario> usuarios = usuarioService.obtenerTodos();
        return usuarios;

    }

}

