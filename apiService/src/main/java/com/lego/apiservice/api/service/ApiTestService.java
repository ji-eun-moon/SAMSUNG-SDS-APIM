package com.lego.apiservice.api.service;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiMethod;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.api.repostiory.ApiRepository;
import com.lego.apiservice.useCheck.entity.domain.UseCheck;
import com.lego.apiservice.useCheck.repository.UseCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiTestService {

    private final UseCheckRepository useCheckRepository;
    private final ApiRepository apiRepository;

    public void apiTest() {
        Random random = new Random();
        List<UseCheck> useCheckList = useCheckRepository.findAll();
        useCheckList.forEach(useCheck -> {
            List<Api> apis = apiRepository.findAllByCategoryId(useCheck.getCategory().getId());
            apis.forEach(api -> {
                for (int i = 0; i < random.nextInt(10) + 1; i++) {
                    log.info(String.valueOf(i));
                    try {
                        if (api.getApiMethod().equals(ApiMethod.GET)) {
                            getTest(api, useCheck.getSecretKey());
                        } else {
                            postTest(api, useCheck.getSecretKey());
                        }
                    }
                     catch (ParseException e) {
                        throw new RuntimeException(e);
                    }
                }
            });
        });
    }

    public void warningTest() {
        Api api = apiRepository.findById(25L).orElseThrow();
        for (int i = 0; i < 100; i++) {
            try {
                if (api.getApiMethod().equals(ApiMethod.GET)) {
                    getTest(api, "token");
                } else {
                    postTest(api, "token");
                }
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void getTest(Api api, String token) throws ParseException {
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
            httpHeaders.set("Authorization", token);
            HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);
        } catch (RestClientException e) {
            log.info(e.getMessage());
        }
    }

    public void postTest(Api api, String token) throws ParseException {
        JSONParser parser = new JSONParser();
        JSONArray jsonArray = (JSONArray) parser.parse(api.getInput());
        Map<String, String> params = new HashMap<>();

        jsonArray.forEach(str -> {
            try {
                JSONObject jsonObject = (JSONObject) parser.parse(String.valueOf(str));
                log.info(jsonObject.toJSONString());
                params.put((String) jsonObject.get("name"), (String) jsonObject.get("example"));
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
            httpHeaders.set("Authorization", token);
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<?> httpEntity = new HttpEntity<>(params, httpHeaders);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        } catch (RestClientException e) {
            log.info(e.getMessage());
        }
    }

}
