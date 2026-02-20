package com.sandbox.sandman.backend.excel;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;

@Component
public class ExcelGenerator {
    public void generateExcel(String filePath) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("รายงาน");

            // สร้างหัวตาราง
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("ชื่อ");
            header.createCell(1).setCellValue("คะแนน");

            // ใส่ข้อมูลตัวอย่าง
            Object[][] data = {
                    {"สมชาย", 85},
                    {"วิภา", 92},
                    {"อนันต์", 78}
            };

            for (int i = 0; i < data.length; i++) {
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(data[i][0].toString());
                row.createCell(1).setCellValue(Integer.parseInt(data[i][1].toString()));
            }

            // บันทึกไฟล์ Excel ลง path ที่ระบุ
            try (FileOutputStream out = new FileOutputStream(filePath)) {
                workbook.write(out);
                System.out.println("✅ สร้างไฟล์ Excel สำเร็จที่: " + filePath);
            }
        } catch (IOException e) {
            System.err.println("❌ เกิดข้อผิดพลาดขณะสร้าง Excel: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
