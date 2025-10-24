package main.java.PROJECTS.controller;
import org.springframework.web.bind.annotation.RestController;  
import org.springframework.web.bind.annotation.RequestMapping;
@RestController
@RequestMapping("/api") 

public class controller {
    @RequestMapping("/")
    public String index(){
        "Welcome to employee mangement system";
        

    }
}
