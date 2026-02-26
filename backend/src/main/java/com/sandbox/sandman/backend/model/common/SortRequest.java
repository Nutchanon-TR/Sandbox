package th.co.scb.cap.cap_corporate_report_api.model.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SortRequest {
    private String field;
    private String direction; // "asc" หรือ "desc"
}
