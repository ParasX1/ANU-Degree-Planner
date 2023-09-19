package com.example.degreeplanner.controller;

import com.example.degreeplanner.model.Course;
import com.example.degreeplanner.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/search")
    public ResponseEntity<List<Course>> searchCourses(@RequestParam String search) {
        List<Course> courses = courseService.searchCoursesByCode(search);
        return ResponseEntity.ok(courses);
    }
}
