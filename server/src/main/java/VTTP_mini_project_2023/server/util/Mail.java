package VTTP_mini_project_2023.server.util;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

@Component
public class Mail {
    public static void sendMail(String recipient) {

        String sender = "no.reply.potterpotion@gmail.com";
        final String password = System.getenv("EMAIL_PASSWORD");
        String host = "smtp.gmail.com";
        Properties properties = System.getProperties();

        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("no.reply.potterpotion@gmail.com", "P0tter_p0ti0n");
            }
        });
        session.setDebug(true);
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(sender));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
            message.setSubject("Order Confirm");
            message.setText("Thank you for shopping woth Potter Potion, hope you to see you again!");
            System.out.println(">>>sending email....");
            Transport.send(message);
            System.out.println(">>> Email send");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}