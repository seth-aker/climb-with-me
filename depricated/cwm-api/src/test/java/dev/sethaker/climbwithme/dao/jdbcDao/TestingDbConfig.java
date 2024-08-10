package dev.sethaker.climbwithme.dao.jdbcDao;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.sql.DataSource;
import java.sql.SQLException;

@Configuration
public class TestingDbConfig {
    private static final String DB_HOST = "localhost";
    private static final String DB_PORT = "5432";
    private static final String DB_NAME = "CWM_TEST_DB";
    private static final String DB_USER = "cwm_appuser";
    private static final String DB_PASSWORD = "climbwithme";
    private SingleConnectionDataSource adminDataSource;
    private JdbcTemplate adminJdbcTemplate;

    @PostConstruct
    public void setup() {
        if (System.getenv("DB_HOST") == null) {
            adminDataSource = new SingleConnectionDataSource();
            adminDataSource.setUrl("jdbc:postgresql://localhost:5432/postgres");
            adminDataSource.setUsername("postgres");
            adminDataSource.setPassword("postgres1");
            adminJdbcTemplate = new JdbcTemplate(adminDataSource);
            adminJdbcTemplate.update("DROP DATABASE IF EXISTS \"" + DB_NAME + "\";");
            adminJdbcTemplate.update("CREATE DATABASE \"" + DB_NAME + "\";");
        }

    }

    @Bean
    public DataSource dataSource() throws SQLException {
        SingleConnectionDataSource dataSource = new SingleConnectionDataSource();
        dataSource.setUrl(String.format("jdbc:postgresql://%s:%s/%s", DB_HOST, DB_PORT, DB_NAME));
        dataSource.setUsername(DB_USER);
        dataSource.setPassword(DB_PASSWORD);
        dataSource.setAutoCommit(false); //So we can rollback after each test.

        ScriptUtils.executeSqlScript(dataSource.getConnection(), new FileSystemResource("../database/schema.sql"));
        ScriptUtils.executeSqlScript(dataSource.getConnection(), new FileSystemResource("../database/procedures.sql"));
        ScriptUtils.executeSqlScript(dataSource.getConnection(), new ClassPathResource("test-data-script.sql"));
        return dataSource;
    }

    @PreDestroy
    public void cleanup() throws SQLException {
        if (adminDataSource != null) {
            adminJdbcTemplate.update("DROP DATABASE \"" + DB_NAME + "\";");
            adminDataSource.getConnection().close();
            adminDataSource.destroy();
        }
    }
}