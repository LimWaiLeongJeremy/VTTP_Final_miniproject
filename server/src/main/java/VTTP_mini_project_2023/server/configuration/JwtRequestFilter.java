package VTTP_mini_project_2023.server.configuration;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import VTTP_mini_project_2023.server.service.JwtService;
import VTTP_mini_project_2023.server.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private JwtService jwtSvc;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println(request.getHeader("Authorization"));
        System.out.println(request.getRequestURL());
        if (request.getHeader("Authorization") != null) {
            // Do something with the Authorization header
            System.out.println(request.getHeader("Authorization"));
        } else {
            System.out.println("token is null");
        }

        final String header = request.getHeader("Authorization");
        // System.out.println("request filter: " + header);

        String jwtToken = null;
        String userName = null;
        if (header != null && header.startsWith("Bearer ")) {
            jwtToken = header.substring(7);
            System.out.println(jwtToken);

            try {
                userName = jwtUtil.getUserNameFromToken(jwtToken);
                System.out.println("request filter: " + userName);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT token is expired");
            }
        } else {
            System.out.println("JWT token does not start with Bearer");
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = jwtSvc.loadUserByUsername(userName);

            if (jwtUtil.validate(jwtToken, userDetails)) {
                System.out.println("JWT validation passed");
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource()
                                .buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        filterChain.doFilter(request, response);

    }

}
