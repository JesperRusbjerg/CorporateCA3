# CorporateCA3

# React: http://corporateca3react.surge.sh/
# React Native: https://expo.io/@p3rlten/ca3frontendapp
# Backend: https://corporategroup.dk/CA3/api

# Endpoints:
@POST
# /login 
Param (String json) - Containing login details: email/password
Returns viable token wrapped in a json object

@GET
@RolesAllowed({"admin"})
# /users
Returns array og all users of the site

@PUT
@Path("{email}")
@RolesAllowed({"admin"})
# /users/email
PathParam email, containing the email of the user to be edited.
Returns the user with a granted or revoked admin role

@POST
# /users
Param String json containing user details: email/password
Returns a viable token wrapped in a json object

@GET
@RolesAllowed({"user", "admin"})
# /swapi
QueryParam int amount to determin how many Star Wars characters to be returned

@GET
@RolesAllowed({"admin"})
# /roles
Returns an array of roles wrapped in a json object

@GET
@RolesAllowed({"user","admin"})
# /dummyData
QueryParam int start, int end, String sort (field names of the given entity), String order (asc/desc)
Returns an array depending on the given QueryParams
If no sort/order is given, the array wont be sorted

# Errorhandling:
If something goes wrong, a json object will be returned containing a statuscode, statusdescription, errormessage.
