package VTTP_mini_project_2023.server.configuration;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
                String msg = "Unauthorized entry";
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, msg);
                throw new UnsupportedOperationException("Unimplemented method 'commence'");
    }
    

}