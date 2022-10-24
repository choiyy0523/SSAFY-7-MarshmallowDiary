package com.marshmallow.user.repository;

import com.marshmallow.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRpository extends JpaRepository<User, UUID> {
}
