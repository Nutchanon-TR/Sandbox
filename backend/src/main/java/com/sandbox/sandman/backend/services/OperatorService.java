package com.sandbox.sandman.backend.services;

import com.sandbox.sandman.backend.DTO.SupOrderDTO;
import com.sandbox.sandman.backend.repositories.SupOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperatorService {
@Autowired
    private SupOrderRepository supplierOrderRepository;

    public List<SupOrderDTO> getAllSupplierOrders() {
        return supplierOrderRepository.findAllSupplierOrders();
    }

}
