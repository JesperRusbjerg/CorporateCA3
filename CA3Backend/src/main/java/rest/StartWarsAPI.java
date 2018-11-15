/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import dto.PersonDTO;
import facade.Facade;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * REST Web Service
 *
 * @author adamlass
 */
@Path("swapi")

public class StartWarsAPI {

    @Context
    private UriInfo context;
    private Facade facade;
    private Gson gson;
    
    @Context
    SecurityContext securityContext;
    

    /**
     * Creates a new instance of StartWarsAPI
     */
    public StartWarsAPI() {
        this.facade = new Facade(Persistence.createEntityManagerFactory("pu"));
        this.gson = new Gson();
    }

    /**
     * Retrieves representation of an instance of rest.StartWarsAPI
     * @return an instance of java.lang.String
     */
    @GET
    @RolesAllowed({"user","admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson(@QueryParam("amount") int amount) throws Exception {
        System.out.println("amount: " + amount);
        List<PersonDTO> persons = facade.SWAPI(amount);
        return Response
                .ok()
                .entity(gson.toJson(persons))
                .type(MediaType.APPLICATION_JSON)
                .build();
        
    }

}
