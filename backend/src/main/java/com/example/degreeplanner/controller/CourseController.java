package com.example.degreeplanner.controller;

import com.example.degreeplanner.model.Course;
import com.example.degreeplanner.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/data")
    public ResponseEntity<List<Course>> searchCourses(@RequestParam(required = false, defaultValue = "") String search) {
        List<Course> courses = courseService.searchCoursesByCode(search);
        return ResponseEntity.ok(courses);
    }
}
