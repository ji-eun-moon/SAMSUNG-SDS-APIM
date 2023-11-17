package com.lego.itdagateway.global.config;

import com.lego.itdagateway.global.exception.BusinessLogicException;
import com.lego.itdagateway.global.exception.ExceptionCode;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class AES128Config {

    private static final String AES_ALGORITHM = "AES/CBC/PKCS5Padding";
    private static final String SECRET_KEY = "1234789012347890"; // 16 bytes secret key
    private static final String INIT_VECTOR = "ifkhmcjeiydjkblr"; // 16 bytes initialization vector

    public String encrypt(String data) throws BusinessLogicException {
        try {
            SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(INIT_VECTOR.getBytes());
            Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
            byte[] encryptedData = cipher.doFinal(data.getBytes("UTF-8"));
            return Base64.getEncoder().encodeToString(encryptedData);
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.ENCRYPTION_FAILED);
        }
    }

    public String decrypt(String encryptedData) throws BusinessLogicException {
        try {
            SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(INIT_VECTOR.getBytes());
            Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
            byte[] decryptedData = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            return new String(decryptedData, "UTF-8");
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.ENCRYPTION_FAILED);
        }
    }
}

