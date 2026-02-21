package com.sandbox.sandman.backend.repositories;

import com.sandbox.sandman.backend.model.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}