/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import callable.SWAPICallable;
import dto.PersonDTO;
import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 *
 * @author adamlass
 */
public class Facade {

    public List<PersonDTO> SWAPI(int amount) throws Exception {
        List<PersonDTO> res = new ArrayList<>();
        
        //Setting up Executor service with thread amount equal to system cores
        ThreadMXBean bean = ManagementFactory.getThreadMXBean();
        ExecutorService es = Executors.newFixedThreadPool(bean.getThreadCount());

        //Creating urls
        List<String> urls = new ArrayList<>();
        for (int i = 1; i <= amount; i++) {
            urls.add("https://swapi.co/api/people/" + i);
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
                res.add(resp);
            } catch (InterruptedException | ExecutionException e) {
                throw e;
            }

        }
        return res;
    }

}
