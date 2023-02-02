package com.example.javaspringboot.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.logging.Filter;
import java.util.logging.LogRecord;

// followed tutorial: https://www.youtube.com/watch?v=Ly79YDERpas
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer getCorsConfiguration(){
        return new WebMvcConfigurer(){
            @Override
            public void addCorsMappings(CorsRegistry registry){

                //old
//                registry.addMapping("/**")
//                        .allowedMethods("*")
//                        .allowedHeaders("*")
//                        .allowedOrigins("http://localhost:3000");

                //new for https
                registry.addMapping("/**") //allow all default endpoints & children of endpoints
                        .allowedOriginPatterns("*")
                        .allowedMethods("*") // allow all methods
                        .allowedHeaders("*"); // allow all headers
            }
        };
    }

}

/*
@Component
public class CorsConfig implements Filter {

    private final Logger log = LoggerFactory.getLogger(SimpleCORSFilter.class);

    public SimpleCORSFilter() {
        log.info("SimpleCORSFilter init");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");

        chain.doFilter(req, res);
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public boolean isLoggable(LogRecord record) {
        return false;
    }
}
*/