package com.lego.apiservice.server.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lego.apiservice.server.dto.request.CreateServerRequest;
import com.lego.apiservice.server.repository.ServerRepository;
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
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, JSONObject.class);
            if (responseEntity.getStatusCode().equals(HttpStatus.OK)) {
                log.info(responseEntity.toString());
                apiTest(responseEntity, endpoint);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void apiTest(ResponseEntity<?> responseEntity, String endpoint) {
        String apiDocsJson = Objects.requireNonNull(responseEntity.getBody()).toString();

        try {
            JsonNode jsonNode = objectMapper.readTree(apiDocsJson);
            JsonNode paths = jsonNode.get("paths");
            JsonNode schema = jsonNode.get("components").get("schemas");

            paths.fields().forEachRemaining(path -> {
                System.out.println("Endpoint: " + path.getKey());
                path.getValue().fields().forEachRemaining(operation -> {
                    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
                    System.out.println("HTTP Method: " + operation.getKey());
                    System.out.println("Summary: " + operation.getValue().get("summary"));
                    System.out.println("Description: " + operation.getValue().get("description"));
                    operation.getValue().get("parameters").forEach(param -> {
                        System.out.println("parameterName : " + param.get("name"));
                        System.out.println("parameterDescription : " + param.get("description"));
                        System.out.println("parameterType : " + param.get("schema").get("type"));
                        System.out.println("parameterExample : " + param.get("example"));
                        if (param.get("schema").get("type") == null) {
                            param.get("example").fields().forEachRemaining(param1 -> {
                                params.put(param1.getKey(), Collections.singletonList(param1.getValue().toString()));
                            });
                        } else {
                            log.info(param.get("name").toString(), Collections.singletonList(String.valueOf(param.get("example"))));
                            if (param.get("schema").get("type").equals("\"string\"")) {
                                params.put(param.get("name").toString(), Collections.singletonList(String.valueOf(param.get("example")).substring(1, String.valueOf(param.get("example")).length()-1)));
                            } else {
                                params.put(param.get("name").toString(), Collections.singletonList(String.valueOf(param.get("example"))));
                            }
                        }
                    });
                    log.info(operation.getValue().get("responses").get("200").get("content").get("*/*").get("schema").get("$ref").toString().split("/")[3].replace("\"", ""));
                    System.out.println(schema.get(operation.getValue().get("responses").get("200").get("content").get("*/*").get("schema").get("$ref").toString().split("/")[3].replace("\"", "")));


                    URI uri = UriComponentsBuilder
                            .fromUriString(endpoint)
                            .queryParams(params)
                            .path(path.getKey())
                            .encode()
                            .build()
                            .toUri();

                    HttpHeaders httpHeaders = new HttpHeaders();
                    HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);
                    RestTemplate restTemplate = new RestTemplate();
                    ResponseEntity<?> responseEntity1 = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);
                    log.info(responseEntity1.toString());
                });

            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
