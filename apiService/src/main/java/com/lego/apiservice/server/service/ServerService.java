package com.lego.apiservice.server.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiMethod;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.api.repostiory.ApiRepository;
import com.lego.apiservice.category.entity.domain.Category;
import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.server.dto.request.CreateServerRequest;
import com.lego.apiservice.server.dto.request.ParameterInfo;
import com.lego.apiservice.server.entity.Server;
import com.lego.apiservice.server.repository.ServerRepository;
import io.swagger.v3.oas.annotations.tags.Tags;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Paths;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
@Transactional(readOnly = true)
public class ServerService {

    private final ServerRepository serverRepository;
    private final CategoryRepository categoryRepository;
    private final ApiRepository apiRepository;

    @Transactional
    public void register(CreateServerRequest createServerRequest) {
        log.info(createServerRequest.getEndPoint());
        Server server = serverRegister(createServerRequest);
        OpenAPI openAPI = apidocsConnect(createServerRequest.getEndPoint());
        categoryRegister(openAPI.getTags(), server);
        apiRegister(openAPI.getPaths(), createServerRequest.getEndPoint(), createServerRequest.getItdaEndpoint(), openAPI.getComponents());
    }

    public OpenAPI apidocsConnect(String endpoint) {

        URI uri = UriComponentsBuilder
                .fromUriString(endpoint)
                .path("/v3/api-docs")
                .encode()
                .build()
                .toUri();

        OpenAPI openAPI = null;
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, OpenAPI.class);
            openAPI = (OpenAPI) responseEntity.getBody();
            assert openAPI != null;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return openAPI;
    }

    public void apiTest(OpenAPI openAPI) {
        String endpoint = openAPI.getServers().get(0).getUrl();

        openAPI.getPaths().forEach((uri, pathItem) -> {
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            if (pathItem.getGet() != null) {
                pathItem.getGet().getParameters().forEach(parameter -> {
                    params.put(parameter.getName(), Collections.singletonList(parameter.getExample().toString()));
                });
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

                getRestTemplate(uri1);
            }
        });
    }

    public Map<String, String> getRestTemplate(URI uri) {
        Map<String, String> status = new HashMap<>();
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);
            RestTemplate restTemplate = new RestTemplate();
            LocalDateTime first = LocalDateTime.now();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);
            LocalDateTime second = LocalDateTime.now();
            Duration diff = Duration.between(first, second);
            log.info(String.valueOf(diff.toMillis()));
            status.put("diff", String.valueOf(diff.toMillis()));
            status.put("status", responseEntity.getStatusCode().toString());
            status.put("output", String.valueOf(responseEntity.getBody()));

            log.info(responseEntity.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }

    @Transactional
    public Server serverRegister(CreateServerRequest createServerRequest) {
        return serverRepository.save(Server.builder()
                        .serverName(createServerRequest.getServerName())
                        .description(createServerRequest.getDescription())
                        .endPoint(createServerRequest.getEndPoint())
                        .serviceEndpoint(createServerRequest.getItdaEndpoint())
                        .employeeId(createServerRequest.getEmployeeId())
                        .teamName(createServerRequest.getTeamName())
                .build());
    }

    @Transactional
    public void categoryRegister(List<Tag> tags, Server server) {
        tags.forEach(tag -> {
            if (categoryRepository.findByName(tag.getName()).isEmpty()) {
                Category savedCategory = categoryRepository.save(Category.builder()
                                .name(tag.getName())
                                .description(tag.getDescription())
                                .server(server)
                        .build());
            }
        });
    }

    @Transactional
    public void apiRegister(Paths paths, String endpoint, String itdaEndpoint, Components components) {
        paths.forEach((uri, pathItem) -> {
            List<ParameterInfo> parameterInfoList = new ArrayList<>();
            MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
            if (pathItem.getGet() != null) {
                pathItem.getGet().getParameters().forEach(parameter -> {
                    parameterInfoList.add(new ParameterInfo(parameter.getName(), parameter.getDescription(), String.valueOf(parameter.getExample()), parameter.getSchema().getType()));
                    queryParams.put(parameter.getName(), Collections.singletonList(String.valueOf(parameter.getExample())));
                });
                log.info(uri);
                log.info(parameterInfoList.toString());

                URI uri1 = UriComponentsBuilder
                        .fromUriString(endpoint)
                        .path(uri)
                        .queryParams(queryParams)
                        .encode()
                        .build()
                        .toUri();

                Map<String, String> status = getRestTemplate(uri1);
                ApiStatus apiStatus = null;
                if (status.get("status").startsWith("2")) {
                    apiStatus = ApiStatus.정상;
                } else if (status.get("status").startsWith("4")) {
                    apiStatus = ApiStatus.오류;
                } else {
                    apiStatus = ApiStatus.점검;
                }
                List<ParameterInfo> output = new ArrayList<>();
                components.getSchemas().get(pathItem.getGet().getResponses().get("200").getContent().get("*/*").getSchema()
                        .get$ref().split("/")[3]).getProperties().forEach((key, value) -> {
                    log.info(key.toString());
                    Schema schema = (Schema) value;
                    output.add(new ParameterInfo(key.toString(), schema.getDescription(), String.valueOf(schema.getExample()), schema.getType()));
                });

                apiRepository.save(Api.builder()
                                .title(pathItem.getGet().getSummary())
                                .content(pathItem.getGet().getDescription())
                                .input(parameterInfoList.toString().replace("ParameterInfo", "")
                                        .replace("(", "{")
                                        .replace(")", "}")
                                        .replace("=", ":"))
                                .output(output.toString().replace("ParameterInfo", "")
                                        .replace("(", "{")
                                        .replace(")", "}")
                                        .replace("=", ":"))
                                .outputExample(status.get("output"))
                                .endpoint(itdaEndpoint+uri)
                                .apiMethod(ApiMethod.GET)
                                .apiStatus(apiStatus)
                                .category(categoryRepository.findByName(pathItem.getGet().getTags().get(0)).orElseThrow())
                                .responseTime(status.get("diff"))
                        .build());
            }

        });
    }

}
