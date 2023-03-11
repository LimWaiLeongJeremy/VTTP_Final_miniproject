package VTTP_mini_project_2023.server.service;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.jdbc.Expectations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import VTTP_mini_project_2023.server.model.JwtRequest;
import VTTP_mini_project_2023.server.model.JwtResponse;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.repository.UserRepository;
import VTTP_mini_project_2023.server.util.JwtUtil;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authMgr;

    public JwtResponse createJwtToken(JwtRequest jwtReq) throws Exception {
        String userName = jwtReq.getUserName();
        String password = jwtReq.getPassword();
        authenticate(userName, password);

        final UserDetails userDetails = loadUserByUsername(userName);

        String newToken = jwtUtil.generateToken(userDetails);

        User user = userRepo.findById(newToken).get();

        return new JwtResponse(user, newToken);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findById(username).get();

        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(),
                    user.getPassword(),
                    getAuthorities(user));
        } else {
            throw new UsernameNotFoundException("Username is not valid");
        }
    }

    private Set getAuthorities(User user) {
        Set authorities = new HashSet<>();
        user.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRole()));
        });

        return authorities;
    }

    private void authenticate(String userName, String password) throws Exception {
        try {
            authMgr.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        } catch (DisabledException e) {
            throw new Exception("User is disabled");
        } catch (BadCredentialsException e) {
            throw new Exception("Bed credential from user");
        }
    }

}
