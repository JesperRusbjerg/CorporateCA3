/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.DummyDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * REST Web Service
 *
 * @author Rasmus
 */
@Path("dummyData")
public class DummyData {

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    public DummyData() {
    }

    @GET
    @Path("{amount}")
    @RolesAllowed({"admin", "user"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDummies(@PathParam("amount") int amount) {
        List<DummyDTO> dummies = new ArrayList();
        String[] fNames = {"Adam", "Jesper", "Nikolai", "Rasmus"};
        String[] lNames = {"Lass", "Rusbjerg", "Perlt", "Helsgaun"};
        Random rnd = new Random();
        for (int i = 1; i < amount + 1; i++) {
            String fName = fNames[rnd.nextInt(fNames.length)];
            String lName = lNames[rnd.nextInt(lNames.length)];
            String gender = rnd.nextBoolean() ? "male" : "female";
            int age = rnd.nextInt(100);
            int height = rnd.nextInt(81) + 130;
            int IQ = rnd.nextInt(401);
            dummies.add(new DummyDTO(fName, lName, gender, age, height, IQ));
        }
        return Response.ok()
                .entity(gson.toJson(dummies))
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}
