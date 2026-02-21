package com.sandbox.sandman.backend.repositories;

import com.sandbox.sandman.backend.model.dto.SupplierOrderDTO;
import com.sandbox.sandman.backend.model.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    // สังเกตว่าไม่มี nativeQuery = true แล้ว
    @Query(value="""
        SELECT new com.sandbox.sandman.backend.model.dto.SupplierOrderDTO(
            o.orderId, s.supplierName, s.contactPerson, 
            o.orderDate, o.deliveryDate, o.status, o.notes
        )
        FROM Supplier s
        JOIN s.orders o ON 
        ORDER BY o.orderDate DESC
        """, nativeQuery = false)
    List<SupplierOrderDTO> findSupplierOrder();
}