package com.lego.apiservice.server.service;

import com.fasterxml.jackson.core.io.JsonStringEncoder;
import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiMethod;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.api.repostiory.ApiRepository;
import com.lego.apiservice.category.entity.domain.Category;
import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.redis.service.RedisService;
import com.lego.apiservice.server.dto.request.CreateServerRequest;
import com.lego.apiservice.server.dto.request.ParameterInfo;
import com.lego.apiservice.server.dto.request.ResponseInfo;
import com.lego.apiservice.server.entity.Server;
import com.lego.apiservice.server.repository.ServerRepository;
import io.swagger.v3.core.util.Json;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.Paths;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.bson.json.JsonObject;
import org.json.simple.JSONObject;
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

import static io.netty.util.CharsetUtil.encoder;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ServerService {

    private final ServerRepository serverRepository;
    private final CategoryRepository categoryRepository;
    private final ApiRepository apiRepository;
    private final RedisService redisService;

    @Transactional
    public void register(CreateServerRequest createServerRequest) {
        log.info(createServerRequest.getEndPoint());
        OpenAPI openAPI = apidocsConnect(createServerRequest.getEndPoint());
        Server server = serverRegister(createServerRequest);
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
            } else {
                pathItem.getPost().getParameters().forEach(parameter -> {
                    params.put(parameter.getName(), Collections.singletonList(parameter.getExample().toString()));
                });

                URI uri1 = UriComponentsBuilder
                        .fromUriString(endpoint)
                        .path(uri)
                        .encode()
                        .build()
                        .toUri();


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
            status.put("output", responseEntity.getBody().toString());


        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }

    public Map<String, String> postRestTemplate(URI uri, Map<String, String> params) {
        Map<String, String> status = new HashMap<>();
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
            log.info("여기까지 잘 되는가????????????");
            HttpEntity<?> httpEntity = new HttpEntity<>(params, httpHeaders);
            RestTemplate restTemplate = new RestTemplate();
            LocalDateTime first = LocalDateTime.now();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
            LocalDateTime second = LocalDateTime.now();
            Duration diff = Duration.between(first, second);
            log.info(String.valueOf(diff.toMillis()));
            status.put("diff", String.valueOf(diff.toMillis()));
            status.put("status", responseEntity.getStatusCode().toString());
            status.put("output", responseEntity.getBody().toString());
            log.info(responseEntity.getBody().toString());


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

            List<String> parameterInfoList = new ArrayList<>();
            MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
            Map<String, String> param = new HashMap<>();
            Map<String, String> status = new HashMap<>();
            ApiMethod apiMethod = null;
            if (pathItem.getGet() != null) {
                pathItem.getGet().getParameters().forEach(parameter -> {
                    Map<String, String> parameterInfo = new HashMap<>();
                    parameterInfo.put("name", parameter.getName());
                    parameterInfo.put("description", parameter.getDescription());
                    parameterInfo.put("example", String.valueOf(parameter.getExample()));
                    parameterInfo.put("type", parameter.getSchema().getType());
                    parameterInfo.put("required", String.valueOf(parameter.getRequired()));

                    parameterInfoList.add(new JSONObject(parameterInfo).toString());
                    queryParams.put(parameter.getName(), Collections.singletonList(String.valueOf(parameter.getExample())));
                });
                log.info(uri);
                log.info(ApiMethod.GET.toString());
                log.info(parameterInfoList.toString());

                URI uri1 = UriComponentsBuilder
                        .fromUriString(endpoint)
                        .path(uri)
                        .queryParams(queryParams)
                        .encode()
                        .build()
                        .toUri();

                status = getRestTemplate(uri1);
                apiRegister(status, components, pathItem, parameterInfoList, itdaEndpoint, ApiMethod.GET, uri);
            }
            if (pathItem.getPost() != null) {
                components.getSchemas().get(pathItem.getPost().getRequestBody().getContent().get("application/json").getSchema().get$ref().split("/")[3]).getProperties().forEach((key, value) -> {
                    Map<String, String> parameterInfo = new HashMap<>();
                    Schema schema = (Schema) value;
                    parameterInfo.put("name", key.toString());
                    parameterInfo.put("description", schema.getDescription());
                    parameterInfo.put("example", String.valueOf(schema.getExample()));
                    parameterInfo.put("type", schema.getType());
                    parameterInfo.put("required", String.valueOf(true));


                    parameterInfoList.add(new JSONObject(parameterInfo).toString());
                    param.put(key.toString(), String.valueOf(schema.getExample()));
                });
                log.info(param.toString());
                URI uri1 = UriComponentsBuilder
                        .fromUriString(endpoint)
                        .path(uri)
                        .encode()
                        .build()
                        .toUri();

                log.info(uri);
                log.info(ApiMethod.POST.toString());

                status = postRestTemplate(uri1, param);
                apiRegister(status, components, pathItem, parameterInfoList, itdaEndpoint, ApiMethod.POST, uri);
            }
        });
    }

    @Transactional
    public void apiRegister(Map<String, String> status, Components components, PathItem pathItem,
                            List<String> parameterInfoList, String itdaEndpoint, ApiMethod apiMethod, String uri) {
        ApiStatus apiStatus = ApiStatus.정상;;
        List<String> output = new ArrayList<>();
        Category category = null;
        if (apiMethod.equals(ApiMethod.GET)) {
            components.getSchemas().get(pathItem.getGet().getResponses().get("200").getContent().get("*/*").getSchema()
                    .get$ref().split("/")[3]).getProperties().forEach((key, value) -> {
                log.info(key.toString());
                Schema schema = (Schema) value;
                Map<String, String> responseInfo = new HashMap<>();
                responseInfo.put("name", key.toString());
                responseInfo.put("description", schema.getDescription());
                responseInfo.put("example", String.valueOf(schema.getExample()));
                responseInfo.put("type", schema.getType());
                output.add(new JSONObject(responseInfo).toString());
            });
            category = categoryRepository.findByName(pathItem.getGet().getTags().get(0)).orElseThrow();
            apiRepository.save(Api.builder()
                    .title(pathItem.getGet().getSummary())
                    .content(pathItem.getGet().getDescription())
                    .input(parameterInfoList.toString())
                    .output(output.toString())
                    .outputExample(status.get("output"))
                    .endpoint(itdaEndpoint+uri)
                    .apiMethod(apiMethod)
                    .apiStatus(apiStatus)
                    .category(category)
                    .updatedAt(LocalDateTime.now())
                    .responseTime(status.get("diff"))
                    .build());
        } else if (apiMethod.equals(ApiMethod.POST)) {
            if (pathItem.getPost().getResponses().get("200") != null) {
                components.getSchemas().get(pathItem.getPost().getResponses().get("200").getContent().get("*/*").getSchema()
                        .get$ref().split("/")[3]).getProperties().forEach((key, value) -> {
                    log.info(key.toString());
                    Schema schema = (Schema) value;
                    Map<String, String> responseInfo = new HashMap<>();
                    responseInfo.put("name", key.toString());
                    responseInfo.put("description", schema.getDescription());
                    responseInfo.put("example", String.valueOf(schema.getExample()));
                    responseInfo.put("type", schema.getType());
                    output.add(new JSONObject(responseInfo).toString());
                });
            } else if (pathItem.getPost().getResponses().get("201") != null) {
                Map<String, String> responseInfo = new HashMap<>();
                responseInfo.put("name", "message");
                responseInfo.put("description", "응답 메시지");
                responseInfo.put("example", "CREATED");
                responseInfo.put("type", "Object");
                output.add(new JSONObject(responseInfo).toString());
            } else if (pathItem.getPost().getResponses().get("202") != null) {
                Map<String, String> responseInfo = new HashMap<>();
                responseInfo.put("name", "message");
                responseInfo.put("description", "응답 메시지");
                responseInfo.put("example", "ACCEPT");
                responseInfo.put("type", "Object");
                output.add(new JSONObject(responseInfo).toString());
            } else if (pathItem.getPost().getResponses().get("204") != null) {
                Map<String, String> responseInfo = new HashMap<>();
                responseInfo.put("name", "message");
                responseInfo.put("description", "응답 메시지");
                responseInfo.put("example", "NO_CONTENT");
                responseInfo.put("type", "Object");
                output.add(new JSONObject(responseInfo).toString());
            }
            category = categoryRepository.findByName(pathItem.getPost().getTags().get(0)).orElseThrow();
            apiRepository.save(Api.builder()
                    .title(pathItem.getPost().getSummary())
                    .content(pathItem.getPost().getDescription())
                    .input(parameterInfoList.toString())
                    .output(output.toString())
                    .outputExample(status.get("output"))
                    .endpoint(itdaEndpoint+uri)
                    .apiMethod(apiMethod)
                    .apiStatus(apiStatus)
                    .category(category)
                    .updatedAt(LocalDateTime.now())
                    .responseTime(status.get("diff"))
                    .build());
        }



        redisService.setValue(itdaEndpoint.replace("https://k9c201.p.ssafy.io/api", "") + uri,
                String.valueOf(category.getId()));
    }

}
