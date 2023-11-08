package com.lego.apiservice.usage.service;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.repostiory.ApiRepository;
import com.lego.apiservice.usage.entity.domain.ElasticUsage;
import com.lego.apiservice.usage.entity.domain.Usage;
import com.lego.apiservice.usage.entity.dto.request.CreateUsageRequest;
import com.lego.apiservice.usage.entity.dto.response.ElasticUsageResponse;
import com.lego.apiservice.usage.entity.dto.response.UsageResponse;
import com.lego.apiservice.usage.entity.dto.statistics.*;
import com.lego.apiservice.usage.increase.service.AutoIncreaseService;
import com.lego.apiservice.usage.repository.ElasticUsageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ElasticUsageService {

    private final ElasticUsageRepository elasticUsageRepository;
    private final ApiRepository apiRepository;
    private final AutoIncreaseService autoIncreaseService;

    @Transactional
    public void register(CreateUsageRequest createUsageRequest) {
        ElasticUsage usage = ElasticUsage.builder()
                .createdAt(createUsageRequest.getCreatedAt())
                .method(createUsageRequest.getMethod())
                .endpoint(createUsageRequest.getEndpoint())
                .teamName(createUsageRequest.getTeamName())
                .categoryId(createUsageRequest.getCategoryId())
                .responseTime(createUsageRequest.getResponseTime())
                .responseCode(createUsageRequest.getResponseCode())
                .build();
        elasticUsageRepository.save(usage);
    }

    public List<ElasticUsageResponse> findAll() {
        List<ElasticUsageResponse> usageResponses = new ArrayList<>();
        elasticUsageRepository.findAll(Sort.by("createdAt").descending()).forEach(usage -> usageResponses.add(new ElasticUsageResponse(usage)));
        return usageResponses;
    }

    @Transactional
    public void deleteAll() {
        elasticUsageRepository.deleteAll();
    }

    public List<MonthlyResponse> getMonthly(Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        List<MonthlyResponse> monthlyResponses = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            YearMonth yearMonth = YearMonth.from(LocalDate.now().minusMonths(5 - i));
            int amount = elasticUsageRepository.findAllByEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                    yearMonth.atDay(1).atTime(0, 0, 0), yearMonth.plusMonths(1).atDay(1).atTime(0, 0, 0)).size();

            monthlyResponses.add(new MonthlyResponse(yearMonth, amount));
        }

        return monthlyResponses;
    }

    public List<MonthlyResponse> getMonthly(String teamName, Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        List<MonthlyResponse> monthlyResponses = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            YearMonth yearMonth = YearMonth.from(LocalDate.now().minusMonths(5 - i));
            int amount = elasticUsageRepository.findAllByTeamNameAndEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(
                    teamName, api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                    yearMonth.atDay(1).atTime(0, 0, 0), yearMonth.plusMonths(1).atDay(1).atTime(0, 0, 0)).size();

            monthlyResponses.add(new MonthlyResponse(yearMonth, amount));
        }

        return monthlyResponses;
    }

    public List<DailyResponse> getDaily(Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        List<DailyResponse> dailyResponses = new ArrayList<>();
        for (int i = 0; i < 31; i++) {
            LocalDate date = LocalDate.now().minusDays(29 - i);
            int amount = elasticUsageRepository.findAllByEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                    date.atTime(0, 0, 0), date.plusDays(1).atTime(0, 0, 0)).size();

            dailyResponses.add(new DailyResponse(date, amount));
        }

        return dailyResponses;
    }

    public List<DailyResponse> getDaily(String teamName, Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        List<DailyResponse> dailyResponses = new ArrayList<>();
        for (int i = 0; i < 31; i++) {
            LocalDate date = LocalDate.now().minusDays(29 - i);
            int amount = elasticUsageRepository.findAllByTeamNameAndEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(teamName,
                    api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                    date.atTime(0, 0, 0), date.plusDays(1).atTime(0, 0, 0)).size();

            dailyResponses.add(new DailyResponse(date, amount));
        }

        return dailyResponses;
    }

    public List<HourlyResponse> getHourly(Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        List<HourlyResponse> hourlyResponses = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            LocalDateTime date = LocalDateTime.now().minusHours(23 - i);
            int amount = elasticUsageRepository.findAllByEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(
                    api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                    date.toLocalDate().atTime(date.getHour(), 0, 0),
                    date.toLocalDate().atTime(date.getHour(), 0, 0).plusHours(1)).size();

            hourlyResponses.add(new HourlyResponse(date, amount));
        }

        return hourlyResponses;
    }

    public List<HourlyResponse> getHourly(String teamName, Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        List<HourlyResponse> hourlyResponses = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            LocalDateTime date = LocalDateTime.now().minusHours(23 - i);
            int amount = elasticUsageRepository.findAllByTeamNameAndEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(teamName,
                    api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                    date.toLocalDate().atTime(date.getHour(), 0, 0),
                    date.toLocalDate().atTime(date.getHour(), 0, 0).plusHours(1)).size();

            hourlyResponses.add(new HourlyResponse(date, amount));
        }

        return hourlyResponses;
    }

    public List<ResponseTimeResponse> getResponseTime(Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();

        return elasticUsageRepository.findAllByEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(
                        api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                        LocalDateTime.now().minusHours(24), LocalDateTime.now()).stream()
                .map(ResponseTimeResponse::new).collect(Collectors.toList());
    }

    public List<ResponseTimeResponse> getResponseTime(String teamName, Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();

        return elasticUsageRepository.findAllByTeamNameAndEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(
                        teamName, api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                        LocalDateTime.now().minusHours(24), LocalDateTime.now()).stream()
                .map(ResponseTimeResponse::new).collect(Collectors.toList());
    }

    public List<ResponseCodeResponse> getResponseCode(Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();

        List<ElasticUsage> usages = elasticUsageRepository.findAllByEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(
                api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                LocalDateTime.now().minusHours(24), LocalDateTime.now());
        List<ResponseCodeResponse> responseCodeResponses = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        usages.forEach(usage -> {
            int amount =  map.getOrDefault(usage.getResponseCode(), 1);
            map.put(usage.getResponseCode(), amount + 1);
        });

        map.forEach((key, value) -> {
            responseCodeResponses.add(new ResponseCodeResponse(key, value));
        });
        return responseCodeResponses;
    }

    public List<ResponseCodeResponse> getResponseCode(String teamName, Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();

        List<ElasticUsage> usages = elasticUsageRepository.findAllByTeamNameAndEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(
                teamName, api.getEndpoint().replace("https://k9c201.p.ssafy.io/api", ""),
                LocalDateTime.now().minusHours(24), LocalDateTime.now());
        List<ResponseCodeResponse> responseCodeResponses = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        usages.forEach(usage -> {
            int amount =  map.getOrDefault(usage.getResponseCode(), 1);
            map.put(usage.getResponseCode(), amount + 1);
        });

        map.forEach((key, value) -> {
            responseCodeResponses.add(new ResponseCodeResponse(key, value));
        });
        return responseCodeResponses;
    }
}
