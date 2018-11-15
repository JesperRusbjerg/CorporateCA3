/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package callable;

import com.google.gson.Gson;
import dto.PersonDTO;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.Callable;

/**
 *
 * @author adamlass
 */
public class SWAPICallable implements Callable<PersonDTO> {

    private String url;
    private static Gson gson;

    public SWAPICallable(String url) {
        this.url = url;
        if (gson == null) {
            this.gson = new Gson();
        }
    }

    @Override
    public PersonDTO call() throws Exception {
        URL siteURL = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) siteURL.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Accept", "application/json;charset=UTF-8");
        connection.setRequestProperty("User-Agent", "server");

        //waits 60 seconds
        connection.setConnectTimeout(60 * 1000);
        connection.connect();

        int code = connection.getResponseCode();
        if (code != 200) {
            System.out.println(url + ": " + code);
        }
        if (code == 200) {
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line + "\n");
            }
            br.close();
            String jsonStr = sb.toString();
//            System.out.println(url + ": " + jsonStr);
            PersonDTO person = gson.fromJson(jsonStr, PersonDTO.class);
            return person;
        }
        return null;
    }

}
