package com.sandbox.sandman.backend.repositories;

import com.sandbox.sandman.backend.DTO.SupOrderDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SupOrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<SupOrderDTO> findAllSupplierOrders() {
        String sql = """
            SELECT o.order_id, s.supplier_name, s.contact_person, 
                   o.order_date, o.delivery_date, o.status, o.notes
            FROM suppliers AS s
            JOIN orders AS o ON s.supplier_id = o.supplier_id
            ORDER BY o.order_date DESC
            """;
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(SupOrderDTO.class));
    }
}
