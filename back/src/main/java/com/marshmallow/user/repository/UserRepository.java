package com.marshmallow.user.repository;

import com.marshmallow.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findBySocialId(String authId);
    User saveAndFlush(User entity);
    User findByUsername(String username);
}
