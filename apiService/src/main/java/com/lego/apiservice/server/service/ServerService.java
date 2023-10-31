package com.lego.apiservice.server.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lego.apiservice.server.dto.request.CreateServerRequest;
import com.lego.apiservice.server.repository.ServerRepository;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.PathItem;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.MultiValueMapAdapter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;
import java.util.function.BiConsumer;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ServerService {

    private final ServerRepository serverRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public void register(CreateServerRequest createServerRequest) {
        test(createServerRequest.getEndPoint());
    }

    public void test(String endpoint) {



        URI uri = UriComponentsBuilder
                .fromUriString(endpoint)
//                .fromUriString("http://localhost:9100")
                .path("/v3/api-docs")
                .encode()
                .build()
                .toUri();

        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, OpenAPI.class);
//            if (responseEntity.getStatusCode().equals(HttpStatus.OK)) {
//                log.info(responseEntity.toString());
//                apiTest(responseEntity, endpoint);
//            }

            OpenAPI openAPI = (OpenAPI) responseEntity.getBody();

            apiTest(openAPI);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    public void apiTest(OpenAPI openAPI) {
        String endpoint = openAPI.getServers().get(0).getUrl();

        openAPI.getPaths().forEach((uri, pathItem) -> {
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            if (pathItem.getGet() != null) {
                pathItem.getGet().getParameters().forEach(parameter -> {
                    params.put(parameter.getName(), Collections.singletonList(parameter.getExample().toString()));
                });
            }

            log.info(endpoint);
            log.info(uri);
            log.info(params.toString());

            URI uri1 = UriComponentsBuilder
                    .fromUriString(endpoint)
                    .path(uri)
                    .queryParams(params)
                    .encode()
                    .build()
                    .toUri();

            try {
                HttpHeaders httpHeaders = new HttpHeaders();
                HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);
                RestTemplate restTemplate = new RestTemplate();
                ResponseEntity<?> responseEntity = restTemplate.exchange(uri1, HttpMethod.GET, httpEntity, Object.class);
                log.info(responseEntity.toString());


            } catch (Exception e) {
                log.info(endpoint  + uri);
                e.printStackTrace();
            }
        });
    }
}
