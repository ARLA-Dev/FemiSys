package com.arlainc.femisys.repositories;

import com.arlainc.femisys.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    List<Usuario> findAll();

    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> getUserByUsername(String username);
}

