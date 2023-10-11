package com.example.degreeplanner.service;

import com.example.degreeplanner.model.Course;
import com.example.degreeplanner.model.Degree;
import com.example.degreeplanner.model.dto.DegreeRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DegreeService {

    @Autowired
    private CourseService courseService;

    public Degree convertToDegree(DegreeRequestDTO dto) {

        // Creates a new degree.
        Degree degree = new Degree();
        List<List<Course>> semesters = new ArrayList<>();

        // Converts the semesters with String Codes to semesters of Course.
        for (List<String> rawSemester : dto.getSemesters()) {
            ArrayList<Course> semester = new ArrayList<>();

            // Get the course that corresponds to the code from the CourseService
            for (String courseCode : rawSemester) {
                Course course = courseService.searchCoursesByCode(courseCode);
                semester.add(course);
            }

            semesters.add(semester);

        }

        degree.setSemesters(semesters);

        return degree;
    }

}
