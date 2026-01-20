package com.miniproject.omakase.backend.services;

import com.miniproject.omakase.backend.excel.ExcelGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FigureService {
    private ExcelGenerator excelGenerator;

    @Autowired
    public FigureService(ExcelGenerator excelGenerator) {
        this.excelGenerator = excelGenerator;
    }

    public void ExcelGenerator (String filePath){
        excelGenerator.generateExcel(filePath);
    }

}
