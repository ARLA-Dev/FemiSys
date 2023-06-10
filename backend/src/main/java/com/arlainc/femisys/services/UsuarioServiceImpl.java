package com.arlainc.femisys.services;

import com.arlainc.femisys.models.Usuario;
import com.arlainc.femisys.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UsuarioServiceImpl implements  UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Usuario> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Usuario save(Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuario.setRespuesta(passwordEncoder.encode(usuario.getRespuesta()));
        return repository.save(usuario);
    }

    @Override
    public Optional<Usuario> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public Optional<Usuario> getUserByUsername(String username) {
        return repository.findByUsername(username)
                .map(usuario -> {
                    Usuario usuarioReducido = new Usuario();
                    usuarioReducido.setId(usuario.getId());
                    usuarioReducido.setPregunta(usuario.getPregunta());
                    usuarioReducido.setUsername(usuario.getUsername());
                    return usuarioReducido;
                });
    }

    private boolean verificarRespuesta(Usuario usuario, String respuesta) {
        return passwordEncoder.matches(respuesta, usuario.getRespuesta());
    }

    @Transactional
    @Override
    public boolean recuperarClave(String username, String respuesta, String nuevaClave) {
        Optional<Usuario> usuarioOptional = findByUsername(username);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (verificarRespuesta(usuario, respuesta)) {
                String claveEncriptada = passwordEncoder.encode(nuevaClave);
                repository.actualizarClave(username, claveEncriptada);
                return true;
            }
        }
        return false;
    }
}
