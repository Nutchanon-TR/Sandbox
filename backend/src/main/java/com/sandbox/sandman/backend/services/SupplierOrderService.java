package com.sandbox.sandman.backend.services;

import com.sandbox.sandman.backend.model.dto.SupplierOrderDTO;
import com.sandbox.sandman.backend.repositories.SupplierOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierOrderService {
@Autowired
    private SupplierOrderRepository supplierOrderRepository;

    public List<SupplierOrderDTO> getAllSupplierOrders() {
        return supplierOrderRepository.findAllSupplierOrders();
    }

}
