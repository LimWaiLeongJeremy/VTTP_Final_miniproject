package VTTP_mini_project_2023.server.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    
    public void sendMail(String receipient) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(receipient);
        message.setSubject("Order Confirmation");
        message.setText("Thank you for shopping with Potter Potion, hope to see you again!");

        javaMailSender.send(message);
    }
}