package com.marshmallow.analysis.repository;

import com.marshmallow.analysis.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnaylsisRpository extends JpaRepository<Analysis, UUID> {
}
