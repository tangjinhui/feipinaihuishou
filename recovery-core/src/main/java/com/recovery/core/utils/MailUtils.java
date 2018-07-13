package com.recovery.core.utils;

import java.security.GeneralSecurityException;
import java.util.Properties;

import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import com.sun.mail.util.MailSSLSocketFactory;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class MailUtils {
	public static void sendHTMLMail() throws GeneralSecurityException, MessagingException {
		JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
		/*
		 * senderImpl.setHost(SpringMailDemoProps.Q_HOST);
		 * senderImpl.setUsername(SpringMailDemoProps.Q_UNAME);
		 * senderImpl.setPassword(SpringMailDemoProps.Q_PSW);
		 */
		senderImpl.setDefaultEncoding("UTF-8");
		Properties prop = new Properties();
		MailSSLSocketFactory sf = new MailSSLSocketFactory();
		sf.setTrustAllHosts(true);
		prop.put("mail.smtp.ssl.enable", "true");
		prop.put("mail.smtp.ssl.socketFactory", sf);
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.timeout", "20000");
		senderImpl.setJavaMailProperties(prop);
		MimeMessage mail = senderImpl.createMimeMessage();
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(mail, true);
			/*
			 * helper.setFrom(SpringMailDemoProps.Q_UNAME);
			 * helper.setTo(SpringMailDemoProps.Q_UNAME);
			 * 
			 */ 
			helper.setSubject("测试标题HTML");

			StringBuilder html = new StringBuilder();
			html.append("<html>").append("<body>").append("<h2>Goser,你好</h2>").append("<p>这是一个测试。</p>")
					.append("<img src='cid:mailImage'/>").append("<p>THANKS</p>").append("</body>").append("</html>");
			// helper.setText(html.toString(),true);
			FileSystemResource mailImage = new FileSystemResource("src/main/webapp/files/images/mail.png");
			helper.addInline("mailImage", mailImage);
			senderImpl.send(mail);
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}

		System.out.println("HTMLMAIL SENDED");
	}
	
	
}
