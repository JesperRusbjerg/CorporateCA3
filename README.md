# CorporateCA3

React: http://corporateca3react.surge.sh/
React Native: https://expo.io/@p3rlten/ca3frontendapp
Backend: https://corporategroup.dk/CA3/api

# Endpoints:
# /login
@POST
Param (String json) - Containing login details: email/password
Returns viable token wrapped in a json object

# /users
@GET
@RolesAllowed({"admin"})
Returns array og all users of the site

# /users/email
@PUT
@Path("{email}")
@RolesAllowed({"admin"})
PathParam email, containing the email of the user to be edited.
Returns the user with a granted or revoked admin role

# /users
@POST
Param String json containing user details: email/password
Returns a viable token wrapped in a json object

# /swapi
@GET
@RolesAllowed({"user", "admin"})
QueryParam int amount to determin how many Star Wars characters to be returned

# /roles
@GET
@RolesAllowed({"admin"})
Returns an array of roles wrapped in a json object

# /dummyData
@GET
@RolesAllowed({"user","admin"})
QueryParam int start, int end, String sort (field names of the given entity), String order (asc/desc)
Returns an array depending on the given QueryParams
If no sort/order is given, the array wont be sorted

# Errorhandling:
If something goes wrong, a json object will be returned containing a statuscode, statusdescription, errormessage.