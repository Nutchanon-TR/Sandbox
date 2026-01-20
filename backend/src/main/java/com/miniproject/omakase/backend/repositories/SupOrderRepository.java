package com.miniproject.omakase.backend.repositories;

import com.miniproject.omakase.backend.DTO.SupOrderDTO;
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

//    public List<SupOrderDTO> findSupplierOrdersItemById(int orderId) {
//        String sql = """
//                SELECT
//                  oi.item_id,
//                  c.category_name,
//                  i.ingredient_name
//                FROM order_items AS oi
//                JOIN ingredients AS i ON oi.ingredient_id = i.ingredient_id
//                JOIN categories AS c ON i.category_id = c.category_id
//                WHERE oi.order_id LIKE '1';""";
//        return jdbcTemplate.query();
//    }
}
