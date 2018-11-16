/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.DummyDTO;
import exceptions.NotFoundException;
import facade.Facade;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
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
    private Facade facade;

    @Context
    SecurityContext securityContext;

    public DummyData() {
        this.facade = new Facade(Persistence.createEntityManagerFactory("pu"));
    }
    

    @GET
    @RolesAllowed({"user","admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDummies(
            @QueryParam("start") int start,
            @QueryParam("end") int end,
            @QueryParam("sort") String sort,
            @QueryParam("order") String order) throws NotFoundException {
        
        List<DummyDTO> dummies = facade.getDummyData(start, end, sort, order);
        return Response.ok()
                .entity(gson.toJson(dummies))
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}
