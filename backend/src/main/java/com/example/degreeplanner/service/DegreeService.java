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

        List<List<List<Course>>> years = new ArrayList<>();

        for (List<List<String>> rawYear : dto.getDegree()) {
            List<List<Course>> year = new ArrayList<>();

            for (List<String> rawSemester : rawYear) {

                List<Course> semester = new ArrayList<>();

                for (String courseCode : rawSemester) {
                    Course course = courseService.searchCoursesByCode(courseCode);
                    semester.add(course);
                }
                year.add(semester);
            }
            years.add(year);
        }

        degree.setYears(years);

        return degree;
    }

}
