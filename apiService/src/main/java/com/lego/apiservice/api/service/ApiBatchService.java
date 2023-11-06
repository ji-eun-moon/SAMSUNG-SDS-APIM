package com.lego.apiservice.api.service;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiMethod;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.api.repostiory.ApiRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApiBatchService {

    private final ApiRepository apiRepository;

    @Scheduled(cron = "0 0/30 * * * *")
    public void apiHealthCheck() {
        apiRepository.findAll().forEach(api -> {
            try {
                if (api.getApiMethod().equals(ApiMethod.GET)) {
                    getRestTemplate(api);
                } else {
                    postRestTemplate(api);
                }
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public void getRestTemplate(Api api) throws ParseException {
        JSONParser parser = new JSONParser();
        JSONArray jsonArray = (JSONArray) parser.parse(api.getInput());
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        jsonArray.forEach(str -> {
            try {
                JSONObject jsonObject = (JSONObject) parser.parse(String.valueOf(str));
                log.info(jsonObject.toJSONString());
                params.put((String) jsonObject.get("name"), Collections.singletonList(jsonObject.get("example").toString()));
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });

        URI uri = UriComponentsBuilder
                .fromUriString(api.getEndpoint())
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("Authorization", "E3EABEF2F41EFE6894E9CE08A0FF5E52C8E8AF8D2A09AAEDC3BB815B494F8F91");
            HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);
            RestTemplate restTemplate = new RestTemplate();
            LocalDateTime first = LocalDateTime.now();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, JSONObject.class);
            LocalDateTime second = LocalDateTime.now();
            Duration diff = Duration.between(first, second);
            log.info("diff " +  diff.toMillis());
            log.info("status " + responseEntity.getStatusCode());
            api.setResponseTime(String.valueOf(diff.toMillis()));
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                api.setApiStatus(ApiStatus.정상);
            } else if (responseEntity.getStatusCode().is4xxClientError()) {
                api.setApiStatus(ApiStatus.오류);
            } else {
                api.setApiStatus(ApiStatus.점검);
            }
            api.setUpdatedAt(LocalDateTime.now());
            apiRepository.save(api);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void postRestTemplate(Api api) throws ParseException {
        JSONParser parser = new JSONParser();
        JSONArray jsonArray = (JSONArray) parser.parse(api.getInput());
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        jsonArray.forEach(str -> {
            try {
                JSONObject jsonObject = (JSONObject) parser.parse(String.valueOf(str));
                log.info(jsonObject.toJSONString());
                params.put((String) jsonObject.get("name"), Collections.singletonList(jsonObject.get("example").toString()));
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });

        URI uri = UriComponentsBuilder
                .fromUriString(api.getEndpoint())
                .encode()
                .build()
                .toUri();

        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("Authorization", "E3EABEF2F41EFE6894E9CE08A0FF5E52C8E8AF8D2A09AAEDC3BB815B494F8F91");
            HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders, params);
            RestTemplate restTemplate = new RestTemplate();
            LocalDateTime first = LocalDateTime.now();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, JSONObject.class);
            LocalDateTime second = LocalDateTime.now();
            Duration diff = Duration.between(first, second);
            log.info("diff " +  diff.toMillis());
            log.info("status " + responseEntity.getStatusCode());
            api.setResponseTime(String.valueOf(diff.toMillis()));
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                api.setApiStatus(ApiStatus.정상);
            } else if (responseEntity.getStatusCode().is4xxClientError()) {
                api.setApiStatus(ApiStatus.오류);
            } else {
                api.setApiStatus(ApiStatus.점검);
            }
            api.setUpdatedAt(LocalDateTime.now());
            apiRepository.save(api);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
