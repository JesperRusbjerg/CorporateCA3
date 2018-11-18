package security;

import entity.Secret;
import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/* This generates a secure random per execution of the server
 * A server restart, will generate a new key, making all existing tokens invalid
 * For production (and if a load-balancer is used) come up with a persistent key strategy */
public class SharedSecret {

    private static EntityManagerFactory emf = Persistence
            .createEntityManagerFactory("pu");

    public static byte[] getSharedKey() {
        Secret secret = findSecret();

        if (secret != null) {
            Calendar cal = Calendar.getInstance();

            Date currentDate = new Date();
            cal.setTime(currentDate);
            int currentWeekOfYear = cal.get(Calendar.WEEK_OF_YEAR);
            int currentYear = cal.get(Calendar.YEAR);

            Date secretDate = secret.getDate();
            cal.setTime(secretDate);
            int secretWeekOfYear = cal.get(Calendar.WEEK_OF_YEAR);
            int secretYear = cal.get(Calendar.YEAR);

            if (currentWeekOfYear == secretWeekOfYear
                    && currentYear == secretYear) {
                return secret.getSecret();
            } else {
                removeSecret(secret);
            }
        }

        //if we get to this point, we generate a new random secret and persist it.
        byte[] newSecretBytes = new byte[32];
        new SecureRandom().nextBytes(newSecretBytes);

        Secret newSecret = new Secret(new Long(1), newSecretBytes);
        return saveSecret(newSecret).getSecret();
    }

    private static Secret findSecret() {
        EntityManager em = emf.createEntityManager();
        Secret secret = null;
        try {
            em.getTransaction().begin();

            secret = em.find(Secret.class, new Long(1));

            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return secret;
    }

    private static Secret saveSecret(Secret secret) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();

            em.persist(secret);

            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return secret;
    }

    private static void removeSecret(Secret secret) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            if (!em.contains(secret)) {
                secret = em.merge(secret);
            }
            em.remove(secret);

            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }
}
