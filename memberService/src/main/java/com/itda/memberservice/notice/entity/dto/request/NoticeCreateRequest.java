package com.itda.memberservice.notice.entity.dto.request;

import java.util.List;

public class NoticeCreateRequest {

    private List<String> employeeIds;
    private String title;
    private String content;
}
