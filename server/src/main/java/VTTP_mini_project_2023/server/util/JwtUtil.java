package VTTP_mini_project_2023.server.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private static final String SECRET_KEY = UUID.randomUUID().toString();

  private static final int TOKEN_VALIDITY = 600 * 5;

  public String getUserNameFromToken(String token) {
    return getClaim(token, Claims::getSubject);
  }

  private <T> T getClaim(String token, Function<Claims, T> claimResolver) {
    final Claims claims = getAllClaims(token);
    return claimResolver.apply(claims);
  }

  private Claims getAllClaims(String token) {
    return Jwts
      .parser()
      .setSigningKey(SECRET_KEY)
      .parseClaimsJws(token)
      .getBody();
  }

  public boolean validate(String token, UserDetails userDetails) {
    String userName = getUserNameFromToken(token);
    return (userName.equals(userDetails.getUsername()) && !tokenExpired(token));
  }

  private boolean tokenExpired(String token) {
    final Date expDate = getExpDate(token);
    return expDate.before(new Date());
  }

  private Date getExpDate(String token) {
    return getClaim(token, Claims::getExpiration);
  }

  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();

    return Jwts
      .builder()
      .setClaims(claims)
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(
        new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000)
      )
      .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
      .compact();
  }
}
