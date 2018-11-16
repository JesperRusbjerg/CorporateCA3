/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import callable.SWAPICallable;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import dto.DummyDTO;
import dto.PersonDTO;
import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import dto.RoleDTO;
import dto.UserDTO;
import entity.Role;
import entity.User;
import exceptions.NotFoundException;
import java.util.Date;
import java.util.List;
import java.util.Random;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import static security.LoginEndpoint.TOKEN_EXPIRE_TIME;
import security.SharedSecret;

/**
 *
 * @author adamlass
 */
public class Facade {

    EntityManagerFactory emf;

    public Facade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEm() {
        return emf.createEntityManager();
    }

    public List<PersonDTO> SWAPI(int amount) throws Exception {
        List<PersonDTO> res = new ArrayList<>();

        //Setting up Executor service with thread amount equal to system cores
        ThreadMXBean bean = ManagementFactory.getThreadMXBean();
        ExecutorService es = Executors.newFixedThreadPool(bean.getThreadCount());

        //Creating urls
        List<String> urls = new ArrayList<>();
        for (int i = 1; i <= amount; i++) {
            int personIndex = 0;
            do {
                personIndex = new Random().nextInt(87) + 1;
            } while (personIndex == 17);
            urls.add("https://swapi.co/api/people/" + personIndex);
        }

        //Creating futures
        ArrayList<Future<PersonDTO>> futures = new ArrayList<>();
        for (String url : urls) {
            SWAPICallable callable = new SWAPICallable(url);
            futures.add(es.submit(callable));
        }

        //Getting responses from futures
        for (Future<PersonDTO> future : futures) {
            try {
                PersonDTO resp = future.get();
                if (resp != null) {
                    res.add(resp);
                }
            } catch (InterruptedException | ExecutionException e) {
                throw e;
            }

        }
        return res;
    }

    public void createUser(User user) throws Exception {
        EntityManager em = getEm();
        try {
            em.getTransaction().begin();
            Role userRole = em.find(Role.class, "user");
            user.addRole(userRole);
            em.persist(user);
            em.getTransaction().commit();
        } catch (Exception e) {
            throw new Exception("Could not save new user");
        } finally {
            em.close();
        }
    }

    public List<UserDTO> getAllUsers() throws NotFoundException {
        EntityManager em = getEm();
        List<UserDTO> list;
        try {
            TypedQuery<UserDTO> tq = em.createQuery("Select new dto.UserDTO(u) from User u", UserDTO.class);
            list = tq.getResultList();
        } finally {
            em.close();
        }
        if (list.get(0) == null) {
            throw new NotFoundException("No users could be found");
        }
        return list;
    }

    public UserDTO editUser(String email) throws NotFoundException {
        EntityManager em = getEm();
        User user = null;
        try {
            em.getTransaction().begin();
            user = em.find(User.class, email);
            if (user == null) {
                throw new NotFoundException("The user could not be found");
            }
            List<Role> roles = user.getRoleList();
            boolean addAdmin = true;
            for (int i = 0; i < roles.size(); i++) {
                if (roles.get(i).getRoleName().equals("admin")) {
                    roles.remove(roles.get(i));
                    addAdmin = false;
                }
            }

            if (addAdmin) {
                roles.add(new Role("admin"));
            }

            em.merge(user);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return new UserDTO(user);
    }

    public List<RoleDTO> getAllRoles() throws NotFoundException {
        EntityManager em = getEm();
        List<RoleDTO> list;
        try {
            TypedQuery<RoleDTO> tq = em.createQuery("Select new dto.RoleDTO(r) from Role r", RoleDTO.class);
            list = tq.getResultList();
        } finally {
            em.close();
        }
        if (list.get(0) == null) {
            throw new NotFoundException("No roles could be found");
        }
        return list;
    }

    public String createToken(String email, List<String> roles) throws JOSEException {

        StringBuilder res = new StringBuilder();
        for (String string : roles) {
            res.append(string);
            res.append(",");
        }
        String rolesAsString = res.length() > 0 ? res.substring(0, res.length() - 1) : "";
        String issuer = "semesterdemo_security_course";

        JWSSigner signer = new MACSigner(SharedSecret.getSharedKey());
        Date date = new Date();
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(email)
                .claim("email", email)
                .claim("roles", rolesAsString)
                .claim("issuer", issuer)
                .issueTime(date)
                .expirationTime(new Date(date.getTime() + TOKEN_EXPIRE_TIME))
                .build();
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(signer);
        return signedJWT.serialize();

    }

    public List<DummyDTO> getDummyData(int start, int end, String sort, String order) throws NotFoundException {
        EntityManager em = getEm();
        List<DummyDTO> list;
        try {
            String jpql = "Select new dto.DummyDTO(d) from Dummy d";

            if (sort != null) {
                jpql += " ORDER BY d." + sort;
                if (order != null) {
                    jpql += " " + order.toUpperCase();
                }
            }

            TypedQuery<DummyDTO> tq = em.createQuery(jpql, DummyDTO.class);

            //if start pagination is set
            if (start > 0) {
                tq.setFirstResult(start);
            }

            //if end pagination is set
            if (end > 0) {
                tq.setMaxResults((end - start));
            }

            list = tq.getResultList();
        } finally {
            em.close();
        }
        if (list.get(0) == null) {
            throw new NotFoundException("No dummy data could be found");
        }
        return list;
    }
}
