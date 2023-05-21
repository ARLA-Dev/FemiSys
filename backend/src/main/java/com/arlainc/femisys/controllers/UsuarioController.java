package com.arlainc.femisys.controllers;

import com.arlainc.femisys.models.Usuario;
import com.arlainc.femisys.services.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UsuarioController {

    @Autowired
    UsuarioServiceImpl usuarioService;

    @GetMapping("api/usuarios")
    public List<Usuario> obtenerUsuarios() {

        List<Usuario> usuarios = usuarioService.findAll();
        return usuarios;

    }

    @GetMapping("api/usuarios/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable(value="id") Long id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        if(usuario.isPresent()) {
            return ResponseEntity.ok().body(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("api/usuarios/usuario/{username}")
    public ResponseEntity<Usuario> obtenerUsuarioPorUsername(@PathVariable(value="username") String username) {
        Optional<Usuario> usuario = usuarioService.findByUsername(username);
        if(usuario.isPresent()) {
            return ResponseEntity.ok().body(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("api/usuarios/recuperar_clave/{username}")
    public ResponseEntity<Usuario> obtenerUsuarioPorUsernameOlvidado(@PathVariable(value="username") String username) {
        Optional<Usuario> usuario = usuarioService.getUserByUsername(username);
        if(usuario.isPresent()) {
            return ResponseEntity.ok().body(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("api/usuarios")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioCreado = usuarioService.save(usuario);
        return ResponseEntity.ok().body(usuarioCreado);
    }

}

