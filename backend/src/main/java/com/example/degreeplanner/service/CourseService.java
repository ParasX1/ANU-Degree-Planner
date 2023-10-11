package com.example.degreeplanner.service;

import com.example.degreeplanner.model.Course;
import com.example.degreeplanner.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> searchCoursesContainingCode(String search) {
        return courseRepository.findCourseByCodeContainingIgnoreCase(search);
    }

    public Course searchCoursesByCode(String code) {
        return courseRepository.findByCode(code);
    }

}
