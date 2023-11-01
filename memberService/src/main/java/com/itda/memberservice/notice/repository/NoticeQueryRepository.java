package com.itda.memberservice.notice.repository;

public interface NoticeQueryRepository {

    int unreadNoticeCount(String employeeId);

}
