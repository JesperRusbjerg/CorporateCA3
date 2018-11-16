/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import dto.DummyDTO;
import entity.Dummy;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

/**
 *
 * @author adamlass
 */
public class SetUpDummyData {
    public static void main(String[] args) {
        //Data amount
        int amount = 10000;
        
        //Generating dummy data
        List<Dummy> dummies = new ArrayList();
        String[] fNames = {"Adam", "Jesper", "Nikolai", "Rasmus"};
        String[] lNames = {"Lass", "Rusbjerg", "Perlt", "Helsgaun"};
        Random rnd = new Random();
        for (int i = 0; i < amount; i++) {
            System.out.print("*");
            String fName = fNames[rnd.nextInt(fNames.length)];
            String lName = lNames[rnd.nextInt(lNames.length)];
            String gender = rnd.nextBoolean() ? "male" : "female";
            int age = rnd.nextInt(100);
            int height = rnd.nextInt(81) + 130;
            int IQ = rnd.nextInt(401);
            dummies.add(new Dummy(i, fName, lName, gender, age, height, IQ));
        }
        
        //Persisting dummy data
        EntityManager em = Persistence.createEntityManagerFactory("pu").createEntityManager();
        em.getTransaction().begin();
        em.createQuery("DELETE FROM Dummy").executeUpdate();
        em.getTransaction().commit();
        
        for (Dummy dummy : dummies) {
            em.getTransaction().begin();
            em.persist(dummy);
            em.getTransaction().commit();
        }
    }
            
}
