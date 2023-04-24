package VTTP_mini_project_2023.server.service;

import VTTP_mini_project_2023.server.model.JwtRequest;
import VTTP_mini_project_2023.server.model.JwtResponse;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.repository.UserRepository;
import VTTP_mini_project_2023.server.util.JwtUtil;
import java.util.HashSet;
import java.util.Set;
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

@Service
public class JwtService implements UserDetailsService {

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private UserRepository userRepo;

  @Autowired
  private AuthenticationManager authenticationManager;

  public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
    String userName = jwtRequest.getUserName();
    String userPassword = jwtRequest.getPassword();
    authenticate(userName, userPassword);

    UserDetails userDetails = loadUserByUsername(userName);
    String newGeneratedToken = jwtUtil.generateToken(userDetails);

    User user = userRepo.findById(userName).get();
    return new JwtResponse(user, newGeneratedToken);
  }

  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {
    User user = userRepo.findById(username).get();

    if (user != null) {
      return new org.springframework.security.core.userdetails.User(
        user.getUserName(),
        user.getPassword(),
        getAuthority(user)
      );
    } else {
      throw new UsernameNotFoundException(
        "User not found with username: " + username
      );
    }
  }

  private Set getAuthority(User user) {
    Set<SimpleGrantedAuthority> authorities = new HashSet<>();
    user
      .getRole()
      .forEach(role -> {
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRole()));
      });
    return authorities;
  }

  private void authenticate(String userName, String userPassword)
    throws Exception {
    try {
      authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(userName, userPassword)
      );
    } catch (DisabledException e) {
      throw new Exception("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new Exception("INVALID_CREDENTIALS", e);
    }
  }
}
