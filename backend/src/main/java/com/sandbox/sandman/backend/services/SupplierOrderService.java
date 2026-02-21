package com.sandbox.sandman.backend.services;

import com.sandbox.sandman.backend.model.dto.SupplierOrderDTO;
import com.sandbox.sandman.backend.repositories.SupplierOrderRepository;
import com.sandbox.sandman.backend.repositories.SupplierRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SupplierOrderService {
@Autowired
    private SupplierRepository supplierRepository;

    public List<SupplierOrderDTO> getAllSupplierOrders() {
        log.info("Process inquiry");
        return supplierRepository.findSupplierOrder();
    }

}
